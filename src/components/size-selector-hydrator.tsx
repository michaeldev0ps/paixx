import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import SizeSelector from './size-selector';

export default function SizeSelectorHydrator() {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    function mountReact(el: Element) {
      if ((el as HTMLElement).getAttribute('data-size-selector-initialized')) return;
      const raw = (el as HTMLElement).getAttribute('data-available-sizes') || 'S,M,L,XL,XXL';
      const sizes = raw.split(',').map((s) => s.trim()).filter(Boolean);

      // mark as initialized to avoid the legacy script mounting a second time
      (el as HTMLElement).setAttribute('data-size-selector-initialized', 'react');

      const container = document.createElement('div');
      el.appendChild(container);

      const productMeta = el.closest('.product-meta');
      const productLink = productMeta?.querySelector('a[href^="/checkout"]') as HTMLAnchorElement | null;

      function handleChange(size: string | null) {
        // update attribute for other scripts
        (el as HTMLElement).setAttribute('data-selected-size', size || '');
        // dispatch legacy event for compatibility
        const ev = new CustomEvent('size:changed', { detail: { size } });
        (el as HTMLElement).dispatchEvent(ev);

        // update the checkout link if present
        if (productLink) {
          const url = new URL(productLink.href, window.location.origin);
          if (size) {
            url.searchParams.set('size', size);
          } else {
            url.searchParams.delete('size');
          }
          productLink.href = url.toString();
        }
      }

      const root = createRoot(container);
      root.render(<SizeSelector availableSizes={sizes} onChange={handleChange} />);

      // ensure the checkout click is guarded
      if (productLink) {
        const guard = (ev: MouseEvent) => {
          const sel = (el as HTMLElement).getAttribute('data-selected-size');
          if (!sel) {
            ev.preventDefault();
            ev.stopPropagation();
            // show the inline size guide modal used by the legacy script
            const modalEvent = new CustomEvent('size-guide:open');
            window.dispatchEvent(modalEvent);
          }
        };
        productLink.addEventListener('click', guard);
      }
    }

    function mountAll() {
      const nodes = document.querySelectorAll('[data-size-selector]');
      nodes.forEach((n) => mountReact(n));
    }

    // initial mount and observe for client-side navigations
    mountAll();
    const observer = new MutationObserver(() => mountAll());
    observer.observe(document.documentElement || document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return null;
}
