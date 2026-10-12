import type { GetServerSideProps } from 'next';
import { getSafeReturnPath } from '../../lib/auth-utils';
import { createSupabaseServerClient } from '../../lib/supabase';

export default function AuthCallbackPage() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
  res,
}) => {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  const code = query.code;
  const failure = { redirect: { destination: '/signin?auth=link-invalid', permanent: false } };

  if (typeof code !== 'string' || code.length === 0 || code.length > 2048) {
    return failure;
  }

  const supabase = createSupabaseServerClient(req, res);
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) {
    console.error('Supabase auth callback failed', {
      name: error.name,
      status: error.status,
    });
    return failure;
  }

  return {
    redirect: {
      destination: getSafeReturnPath(query.next),
      permanent: false,
    },
  };
};
