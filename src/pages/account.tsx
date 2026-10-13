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
    <main className="account-page">
      <header className="account-header">
        <Link className="auth-brand" href="/" aria-label="PAIXX home">PAIXX</Link>
        <Link className="account-shop-link" href="/collections/001">Continue shopping</Link>
      </header>

      <div className="account-dashboard">
        <aside className="account-sidebar" aria-label="Account navigation">
          <p className="eyebrow">Your account</p>
          <nav>
            <a href="#overview" aria-current="page">Overview</a>
            <a href="#orders">Orders</a>
            <a href="#details">Account details</a>
          </nav>
          <button className="auth-signout" disabled={isSigningOut} onClick={signOut} type="button">
            {isSigningOut ? 'Please wait...' : 'Sign out'}
          </button>
        </aside>

        <div className="account-content">
          <section className="account-welcome" id="overview" aria-labelledby="account-title">
            <p className="eyebrow">PAIXX / Account overview</p>
            <h1 id="account-title">Welcome back</h1>
            <p>Your account, all in one place.</p>
          </section>

          <section className="account-panel" id="orders" aria-labelledby="orders-title">
            <div className="account-panel-heading">
              <div>
                <p className="eyebrow">Your activity</p>
                <h2 id="orders-title">Orders</h2>
              </div>
              <span className="account-status">Order tracking coming soon</span>
            </div>
            <div className="account-empty-state">
              <h3>No order history yet</h3>
              <p>Order tracking will appear here once checkout is available.</p>
              <Link className="auth-continue" href="/collections/001">Explore Collection 001</Link>
            </div>
          </section>

          <section className="account-panel" id="details" aria-labelledby="details-title">
            <div className="account-panel-heading">
              <div>
                <p className="eyebrow">Personal information</p>
                <h2 id="details-title">Account details</h2>
              </div>
            </div>
            <dl className="account-details">
              <div>
                <dt>Email address</dt>
                <dd>{email ?? 'Email unavailable'}</dd>
              </div>
              <div>
                <dt>Email status</dt>
                <dd>Verified</dd>
              </div>
            </dl>
          </section>

          <p className="auth-message" aria-live="polite" role="status">{message}</p>
        </div>
      </div>
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
