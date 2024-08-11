import { getProductByIdApi } from '@/src/api/product/product.api';
import Layout from '@/src/components/layout/main-layout/Layout';
import CategoryTemplate from '@/src/components/templates/category/Category';
import ProductTemplate from '@/src/components/templates/product/Product';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function CategorySlug() {
  const { slug } = useRouter().query;

  if (!slug) {
    return <h1>Not Found</h1>;
  }

  return (
    <>
      {slug.length === 1 ? (
        <CategoryTemplate category={slug[0]} />
      ) : slug.length === 2 ? (
        <ProductTemplate productId={slug[1]} />
      ) : null}
    </>
  );
}

CategorySlug.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({
  params,
}: {
  params: { slug: string[] };
}) {
  const queryClient = new QueryClient();
  const { slug } = params;

  if (slug && slug.length === 2) {
    await queryClient.prefetchQuery({
      queryKey: ['products', 'single', slug[1]],
      queryFn: () => getProductByIdApi(slug[1]),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}
