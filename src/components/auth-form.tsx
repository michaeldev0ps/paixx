import { useState, type FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type AuthMode =
  | 'signin'
  | 'signup'
  | 'recovery'
  | 'resend-verification'
  | 'update-password';

const content: Record<AuthMode, { title: string; description: string; button: string }> = {
  signin: {
    title: 'Sign in',
    description: 'Access your PAIXX account.',
    button: 'Continue',
  },
  signup: {
    title: 'Create account',
    description: 'Create an account to access your PAIXX experience.',
    button: 'Create account',
  },
  recovery: {
    title: 'Reset password',
    description: 'Enter your email and we’ll send password reset instructions if an account is eligible.',
    button: 'Send instructions',
  },
  'resend-verification': {
    title: 'Verify email',
    description: 'Request another verification email if your address is eligible.',
    button: 'Resend verification',
  },
  'update-password': {
    title: 'Choose a new password',
    description: 'Set a new password for your account.',
    button: 'Update password',
  },
};

const actionForMode: Record<AuthMode, string> = {
  signin: 'signin',
  signup: 'signup',
  recovery: 'recovery',
  'resend-verification': 'resend-verification',
  'update-password': 'update-password',
};

export default function AuthForm({
  mode,
  next = '/account',
}: {
  mode: AuthMode;
  next?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const page = content[mode];
  const needsPassword = mode === 'signin' || mode === 'signup' || mode === 'update-password';
  const needsEmail = mode !== 'update-password';

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionForMode[mode],
          email,
          password,
          next,
        }),
      });
      const result: { message?: string; redirectTo?: string } = await response.json();

      if (!response.ok) {
        setMessage(result.message ?? 'Unable to complete that request. Please try again.');
        return;
      }

      if (result.redirectTo) {
        await router.push(result.redirectTo);
        return;
      }

      setMessage(result.message ?? 'Request received. Check your email for next steps.');
    } catch {
      setMessage('Unable to reach the account service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Head>
        <title>{page.title} | PAIXX</title>
        <meta name="description" content={page.description} />
      </Head>
      <main className="auth-page">
        <Link className="auth-brand" href="/" aria-label="PAIXX home">PAIXX</Link>
        <section className="auth-card" aria-labelledby="auth-title">
          <p className="eyebrow">Member access</p>
          <h1 id="auth-title">{page.title}</h1>
          <p>{page.description}</p>
          <form className="auth-form" onSubmit={submit}>
            {needsEmail && (
              <label htmlFor="auth-email">
                Email
                <input
                  autoComplete="email"
                  id="auth-email"
                  maxLength={320}
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  value={email}
                />
              </label>
            )}
            {needsPassword && (
              <label htmlFor="auth-password">
                {mode === 'update-password' ? 'New password' : 'Password'}
                <input
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  id="auth-password"
                  maxLength={256}
                  minLength={6}
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </label>
            )}
            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Please wait...' : page.button}
            </button>
            <p className="auth-message" aria-live="polite" role="status">{message}</p>
          </form>
          <nav className="auth-links" aria-label="Account links">
            {mode === 'signin' && (
              <>
                <Link href={`/signup?next=${encodeURIComponent(next)}`}>Create account</Link>
                <Link href="/forgot-password">Forgot password?</Link>
                <Link href="/resend-verification">Resend verification</Link>
              </>
            )}
            {mode === 'signup' && <Link href={`/signin?next=${encodeURIComponent(next)}`}>Already have an account? Sign in</Link>}
            {(mode === 'recovery' || mode === 'resend-verification') && <Link href="/signin">Back to sign in</Link>}
            {mode === 'update-password' && <Link href="/signin">Back to sign in</Link>}
          </nav>
        </section>
      </main>
    </>
  );
}
