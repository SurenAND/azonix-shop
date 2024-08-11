import { getProductByIdApi } from '@/src/api/product/product.api';
import Layout from '@/src/components/layout/main-layout/Layout';
import ProductTemplate from '@/src/components/templates/product/Product';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function ShopProductPage() {
  const { product } = useRouter().query;
  if (typeof product !== 'string') {
    return <div>Category not found</div>;
  }

  return <ProductTemplate productId={product} />;
}

ShopProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps({
  params,
}: {
  params: { product: string };
}) {
  const queryClient = new QueryClient();
  const { product } = params;

  if (product) {
    await queryClient.prefetchQuery({
      queryKey: ['products', 'single', product],
      queryFn: () => getProductByIdApi(product),
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
