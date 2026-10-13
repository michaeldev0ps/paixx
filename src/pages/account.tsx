import { useState } from 'react';
import Link from 'next/link';
import type { GetServerSideProps } from 'next';
import { isEmailConfirmed } from '../lib/auth-utils';
import { createSupabaseServerClient } from '../lib/supabase';

export default function AccountPage({ email }: { email: string | null }) {
  const [message, setMessage] = useState('');
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'signout' }),
      });
      const result: { message?: string; redirectTo?: string } = await response.json();
      if (!response.ok) {
        setMessage(result.message ?? 'Unable to sign out right now. Please try again.');
        return;
      }
      window.location.assign(result.redirectTo ?? '/signin');
    } catch {
      setMessage('Unable to reach the account service. Please try again.');
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <main className="auth-page">
      <Link className="auth-brand" href="/">PAIXX</Link>
      <section className="auth-card" aria-labelledby="account-title">
        <p className="eyebrow">Member access</p>
        <h1 id="account-title">Your account</h1>
        <p>You are signed in{email ? ` as ${email}` : ''}.</p>
        <p>Order history and account features will appear here as they become available.</p>
        <button className="auth-signout" disabled={isSigningOut} onClick={signOut} type="button">
          {isSigningOut ? 'Please wait...' : 'Sign out'}
        </button>
        <p className="auth-message" aria-live="polite" role="status">{message}</p>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<{ email: string | null }> = async ({
  req,
  res,
}) => {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  const supabase = createSupabaseServerClient(req, res);
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Account session verification failed', {
      name: error.name,
      status: error.status,
    });
  }
  if (error || !data.user || !isEmailConfirmed(data.user.email_confirmed_at)) {
    return {
      redirect: {
        destination: '/signin?next=%2Faccount',
        permanent: false,
      },
    };
  }

  return {
    props: {
      email: data.user.email ?? null,
    },
  };
};
