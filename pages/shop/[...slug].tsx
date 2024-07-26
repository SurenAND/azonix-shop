import Layout from '@/src/components/layout/main-layout/Layout';
import CategoryTemplate from '@/src/components/templates/category/Category';
import ProductTemplate from '@/src/components/templates/product/Product';
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
