import type { GetServerSideProps } from 'next';
import AuthForm from '../components/auth-form';
import { getSafeReturnPath } from '../lib/auth-utils';

export default function SignInPage({ next }: { next: string }) {
  return <AuthForm mode="signin" next={next} />;
}

export const getServerSideProps: GetServerSideProps<{ next: string }> = async ({
  query,
  res,
}) => {
  res.setHeader('Cache-Control', 'private, no-store, max-age=0');
  const next = getSafeReturnPath(query.next);
  return { props: { next } };
};
