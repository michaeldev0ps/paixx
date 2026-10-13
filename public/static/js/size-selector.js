/* Lightweight DOM size selector for legacy HTML pages.
   - Finds elements with [data-size-selector] and renders size buttons
   - Expects data-available-sizes="S,M,L,XL,XXL" (comma-separated)
   - Dispatches 'size:changed' CustomEvent with detail { size: 'M' } when selection changes
   - Provides an inline modal for the size guide opened via 'Size guide' button
*/
(function () {
  if (typeof document === 'undefined') return;

  function createButton(text, isSelected) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'size-button' + (isSelected ? ' is-selected' : '');
    btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
    btn.textContent = text;
    return btn;
  }

  function createGuide() {
    // Modal elements
    const overlay = document.createElement('div');
    overlay.className = 'size-guide-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Size guide');

    const panel = document.createElement('div');
    panel.className = 'size-guide-panel';

    const title = document.createElement('h2');
    title.textContent = 'Size guide';

    const p = document.createElement('p');
    p.textContent = 'Official measurements are coming soon. For now, please rely on the garment description before ordering.';

    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'size-guide-close';
    close.textContent = 'Close';

    close.addEventListener('click', () => {
      overlay.remove();
      document.body.classList.remove('size-guide-open');
    });

    panel.appendChild(title);
    panel.appendChild(p);
    panel.appendChild(close);
    overlay.appendChild(panel);
    return overlay;
  }

  function mount(el) {
    const raw = el.getAttribute('data-available-sizes') || 'S,M,L,XL,XXL';
    const sizes = raw.split(',').map((s) => s.trim()).filter(Boolean);

    const wrapper = document.createElement('div');
    wrapper.className = 'size-selector';

    const btnRow = document.createElement('div');
    btnRow.className = 'size-buttons';

    let selected = null;

    function updateButtons() {
      btnRow.innerHTML = '';
      sizes.forEach((s) => {
        const isSelected = selected === s;
        const b = createButton(s, isSelected);
        b.addEventListener('click', () => {
          selected = selected === s ? null : s;
          // reflect selection as an attribute for other scripts
          el.setAttribute('data-selected-size', selected || '');
          updateButtons();
          const event = new CustomEvent('size:changed', { detail: { size: selected } });
          el.dispatchEvent(event);

          // If there's a checkout link in the same product-meta, update its href
          try {
            const parent = el.closest('.product-meta');
            if (parent) {
              const link = parent.querySelector('a[href^="/checkout"]');
              if (link) {
                const url = new URL(link.href, window.location.origin);
                if (selected) {
                  url.searchParams.set('size', selected);
                } else {
                  url.searchParams.delete('size');
                }
                link.href = url.toString();
              }
            }
          } catch (err) {
            // ignore URL construction errors
          }
        });
        btnRow.appendChild(b);
      });
    }

    updateButtons();

    const guide = document.createElement('button');
    guide.type = 'button';
    guide.className = 'size-guide-link';
    guide.textContent = 'Size guide';
    guide.addEventListener('click', () => {
      const modal = createGuide();
      document.body.appendChild(modal);
      document.body.classList.add('size-guide-open');
    });

    wrapper.appendChild(btnRow);
    wrapper.appendChild(guide);

    el.appendChild(wrapper);

    // If there's a checkout link in the same product-meta, guard it so a size must be selected
    try {
      const parent = el.closest('.product-meta');
      if (parent) {
        const link = parent.querySelector('a[href^="/checkout"]');
        if (link) {
          const guard = (ev) => {
            const sel = el.getAttribute('data-selected-size');
            if (!sel) {
              ev.preventDefault();
              ev.stopPropagation();
              // gently show the size guide modal and a hint
              const modal = createGuide();
              const hint = document.createElement('p');
              hint.className = 'size-hint';
              hint.textContent = 'Please select a size before continuing to checkout.';
              modal.querySelector('.size-guide-panel')?.insertBefore(hint, modal.querySelector('.size-guide-panel').firstChild);
              document.body.appendChild(modal);
              document.body.classList.add('size-guide-open');
            }
          };
          link.addEventListener('click', guard);
        }
      }
    } catch (err) {
      // ignore
    }
  }

  // Mount any matching selectors that haven't been initialized yet
  function mountAll() {
    const nodes = document.querySelectorAll('[data-size-selector]:not([data-size-selector-initialized])');
    nodes.forEach((n) => {
      mount(n);
      n.setAttribute('data-size-selector-initialized', '1');
    });
  }

  // Mount immediately if DOM is ready, otherwise wait for DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll);
  } else {
    // ensure asynchronous to allow Next.js hydration inserts to settle
    setTimeout(mountAll, 0);
  }

  // Observe DOM mutations so the selector is mounted on client-side navigations (Next.js router)
  try {
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length) {
          mountAll();
          break;
        }
      }
    });
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });
  } catch (err) {
    // MutationObserver not supported? Fallback: attempt a periodic scan
    setInterval(mountAll, 1000);
  }

  // Also listen to a global open event from the React component.
  window.addEventListener('size-guide:open', () => {
    const modal = createGuide();
    document.body.appendChild(modal);
    document.body.classList.add('size-guide-open');
  });
})();
