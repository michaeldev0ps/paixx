import type { NextApiRequest, NextApiResponse } from 'next';
import { isSameOriginRequest, getSafeReturnPath } from '../../lib/auth-utils';
import {
  createSupabaseServerClient,
  getAuthCallbackUrl,
} from '../../lib/supabase';

type ApiResponse = {
  message?: string;
  redirectTo?: string;
};

type AuthPayload = {
  action?: unknown;
  email?: unknown;
  password?: unknown;
  next?: unknown;
};

const genericEmailResponse = {
  message: 'If the address is eligible, instructions will be sent by email.',
};

function isRecord(value: unknown): value is AuthPayload {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validEmail(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 320 && value.trim().length > 0;
}

function validPassword(value: unknown): value is string {
  return typeof value === 'string' && value.length >= 6 && value.length <= 256;
}

function logAuthFailure(action: string, error: { name: string; status?: number }) {
  console.error(`Supabase ${action} failed`, {
    name: error.name,
    status: error.status,
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8kb',
    },
  },
};

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>,
) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed.' });
  }
  if (req.headers['content-type']?.split(';', 1)[0].trim() !== 'application/json') {
    return res.status(415).json({ message: 'Unsupported request format.' });
  }
  if (!isSameOriginRequest(
    req.headers.origin,
    req.headers.host,
    process.env.NODE_ENV === 'production',
  )) {
    return res.status(403).json({ message: 'Request origin could not be verified.' });
  }
  if (!isRecord(req.body)) {
    return res.status(400).json({ message: 'Invalid request.' });
  }

  const payload = req.body;
  const next = getSafeReturnPath(payload.next);

  try {
    const supabase = createSupabaseServerClient(req, res);

    switch (payload.action) {
      case 'signin': {
        if (!validEmail(payload.email) || typeof payload.password !== 'string' || payload.password.length === 0 || payload.password.length > 256) {
          return res.status(400).json({ message: 'Enter a valid email and password.' });
        }

        const { error } = await supabase.auth.signInWithPassword({
          email: payload.email.trim(),
          password: payload.password,
        });
        if (error) {
          logAuthFailure('sign-in', error);
          return res.status(401).json({ message: 'Unable to sign in with those details.' });
        }
        return res.status(200).json({ redirectTo: next });
      }
      case 'signup': {
        if (!validEmail(payload.email) || !validPassword(payload.password)) {
          return res.status(400).json({ message: 'Enter a valid email and a password of at least 6 characters.' });
        }

        const { error } = await supabase.auth.signUp({
          email: payload.email.trim(),
          password: payload.password,
          options: { emailRedirectTo: getAuthCallbackUrl('/account') },
        });
        if (error) {
          logAuthFailure('sign-up', error);
          return res.status(503).json({ message: 'Unable to complete sign-up right now. Please try again later.' });
        }
        return res.status(202).json(genericEmailResponse);
      }
      case 'recovery': {
        if (!validEmail(payload.email)) {
          return res.status(400).json({ message: 'Enter a valid email address.' });
        }

        const { error } = await supabase.auth.resetPasswordForEmail(
          payload.email.trim(),
          { redirectTo: getAuthCallbackUrl('/update-password') },
        );
        if (error) {
          logAuthFailure('password recovery', error);
          return res.status(503).json({ message: 'Unable to process that request right now. Please try again later.' });
        }
        return res.status(202).json(genericEmailResponse);
      }
      case 'resend-verification': {
        if (!validEmail(payload.email)) {
          return res.status(400).json({ message: 'Enter a valid email address.' });
        }

        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: payload.email.trim(),
          options: { emailRedirectTo: getAuthCallbackUrl('/account') },
        });
        if (error) {
          logAuthFailure('verification resend', error);
          if (error.status === 422) {
            // A confirmed account must receive the same response as an eligible address.
            return res.status(202).json(genericEmailResponse);
          }
          return res.status(503).json({ message: 'Unable to process that request right now. Please try again later.' });
        }
        return res.status(202).json(genericEmailResponse);
      }
      case 'update-password': {
        if (!validPassword(payload.password)) {
          return res.status(400).json({ message: 'Choose a password of at least 6 characters.' });
        }

        const { data, error: claimsError } = await supabase.auth.getClaims();
        if (claimsError || !data?.claims || data.claims.email_verified !== true) {
          if (claimsError) {
            logAuthFailure('password-update session check', claimsError);
          }
          return res.status(401).json({ message: 'This password link is invalid or has expired. Request a new one and try again.' });
        }

        const { error } = await supabase.auth.updateUser({ password: payload.password });
        if (error) {
          logAuthFailure('password update', error);
          return res.status(503).json({ message: 'Unable to update the password right now. Please try again later.' });
        }
        return res.status(200).json({
          message: 'Your password has been updated.',
          redirectTo: '/account',
        });
      }
      case 'signout': {
        const { error } = await supabase.auth.signOut();
        if (error) {
          logAuthFailure('sign-out', error);
          return res.status(503).json({ message: 'Unable to sign out right now. Please try again.' });
        }
        return res.status(200).json({ redirectTo: '/signin' });
      }
      default:
        return res.status(400).json({ message: 'Unsupported account request.' });
    }
  } catch (error) {
    console.error(
      'Supabase authentication request could not be completed.',
      error instanceof Error ? error.name : 'Unknown error',
    );
    return res.status(503).json({
      message: 'The account service is temporarily unavailable. Please try again later.',
    });
  }
}
