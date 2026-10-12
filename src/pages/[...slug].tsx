import type { GetStaticPaths, GetStaticProps } from 'next';
import StorefrontPage from '../components/storefront-page';
import {
  loadStorefrontPage,
  storefrontRoutes,
  type StorefrontPageContent,
} from '../lib/storefront-pages';

type LegacyPageProps = StorefrontPageContent;

export default function LegacyPage(props: LegacyPageProps) {
  return <StorefrontPage {...props} />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: storefrontRoutes.map((route) => ({
    params: { slug: route.split('/') },
  })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<LegacyPageProps> = async ({
  params,
}) => {
  const slug = params?.slug;
  if (!Array.isArray(slug) || slug.length === 0) {
    return { notFound: true };
  }

  const page = await loadStorefrontPage(slug.join('/'));
  if (!page) {
    return { notFound: true };
  }

  return { props: page };
};
