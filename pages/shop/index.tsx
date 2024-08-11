import { getAllCategoriesApi } from '@/src/api/category/category.api';
import { getAllProductsApi } from '@/src/api/product/product.api';
import Layout from '@/src/components/layout/main-layout/Layout';
import ShopTemplate from '@/src/components/templates/shop/Shop';
import { withCSR } from '@/src/lib/utils';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';

export default function Shop() {
  return <ShopTemplate />;
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = withCSR(async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['categories'],
      queryFn: () => getAllCategoriesApi(),
    }),
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: () => getAllProductsApi({ page: 1, limit: 12 }),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
});
