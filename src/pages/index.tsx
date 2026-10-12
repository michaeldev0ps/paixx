import type { GetStaticProps } from 'next';
import StorefrontPage from '../components/storefront-page';
import {
  loadHomePage,
  type StorefrontPageContent,
} from '../lib/storefront-pages';

type HomeProps = StorefrontPageContent & { collection001: true };

export default function Home(props: HomeProps) {
  return <StorefrontPage {...props} />;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: { ...await loadHomePage(), collection001: true },
});
