import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

type SessionResponse = {
  authenticated?: boolean;
  message?: string;
};

function replaceSignInLinksWithAccountLinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-account-nav]').forEach((link) => {
    // If the link already appears to be the profile link, do nothing.
    if (link.classList.contains('profile-nav-link')) return;

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '1.6');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.classList.add('profile-nav-icon');

    const head = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    head.setAttribute('cx', '12');
    head.setAttribute('cy', '8');
    head.setAttribute('r', '3.5');

    const shoulders = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    shoulders.setAttribute('d', 'M5 21a7 7 0 0 1 14 0');
    icon.append(head, shoulders);

    link.href = '/account';
    link.className = 'profile-nav-link';
    link.setAttribute('aria-label', 'Your account');
    link.setAttribute('title', 'Your account');
    link.replaceChildren(icon);
  });
}

export default function AccountNavStatus() {
  const router = useRouter();
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let mounted = true;

    async function updateNavigation(signal?: AbortSignal) {
      try {
        const response = await fetch('/api/auth', {
          method: 'GET',
          credentials: 'same-origin',
          cache: 'no-store',
          headers: { Accept: 'application/json' },
          signal,
        });

        if (!response.ok) {
          // If unauthorized or other non-OK, don't throw a noisy error for 401/403.
          if (response.status === 401 || response.status === 403) {
            return;
          }
          const result = await response.json().catch(() => ({})) as SessionResponse;
          throw new Error(result.message ?? 'Unable to verify the account session.');
        }

        const result = await response.json().catch(() => ({})) as SessionResponse;
        if (mounted && result.authenticated === true) {
          replaceSignInLinksWithAccountLinks();
        }
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
        // Silently log so it doesn't disrupt user flow.
        // eslint-disable-next-line no-console
        console.debug('AccountNavStatus: session check failed', err);
      }
    }

    function scheduleUpdate() {
      // Abort any in-flight check and start a fresh one.
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;
      updateNavigation(controller.signal);
    }

    // Initial check on mount.
    scheduleUpdate();

    // Re-check when the route changes (client-side navigation).
    router.events.on('routeChangeComplete', scheduleUpdate);

    // Re-check on window focus (useful after auth redirects or popup sign-in flows).
    window.addEventListener('focus', scheduleUpdate);

    // Also try on visibilitychange if page becomes visible.
    function onVisibility() {
      if (document.visibilityState === 'visible') scheduleUpdate();
    }
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      mounted = false;
      router.events.off('routeChangeComplete', scheduleUpdate);
      window.removeEventListener('focus', scheduleUpdate);
      document.removeEventListener('visibilitychange', onVisibility);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [router.events]);

  return null;
}
