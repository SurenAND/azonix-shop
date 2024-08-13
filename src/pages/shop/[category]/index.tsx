import { getAllCategoriesApi } from '@/src/api/category/category.api';
import { getAllProductsApi } from '@/src/api/product/product.api';
import Layout from '@/src/components/layout/main-layout/Layout';
import CategoryTemplate from '@/src/components/templates/category/Category';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

export default function ShopCategoryPage() {
  const { category } = useRouter().query;
  if (typeof category !== 'string') {
    return <div>Category not found</div>;
  }

  return <CategoryTemplate categorySlug={category} />;
}

ShopCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async ({
  params,
}: {
  params: { category: string };
}) => {
  const queryClient = new QueryClient();
  const { category } = params;
  let categoryId = '';
  const data = await getAllCategoriesApi({ slugname: category });
  categoryId = data?.data.categories[0]._id;

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ['products'],
      queryFn: () =>
        getAllProductsApi({ page: 1, limit: 9, category: categoryId }),
    }),
  ]);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
