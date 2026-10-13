import { useEffect } from 'react';

type SessionResponse = {
  authenticated?: boolean;
  message?: string;
};

function replaceSignInLinksWithAccountLinks() {
  document.querySelectorAll<HTMLAnchorElement>('[data-account-nav]').forEach((link) => {
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
  useEffect(() => {
    let active = true;

    async function updateNavigation() {
      const response = await fetch('/api/auth', {
        method: 'GET',
        credentials: 'same-origin',
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        const result = await response.json() as SessionResponse;
        throw new Error(result.message ?? 'Unable to verify the account session.');
      }

      const result = await response.json() as SessionResponse;
      if (active && result.authenticated === true) {
        replaceSignInLinksWithAccountLinks();
      }
    }

    updateNavigation().catch((error: unknown) => {
      console.error(
        'Unable to update account navigation.',
        error instanceof Error ? error.message : 'Unknown error',
      );
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
