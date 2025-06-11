import Layout from '@/src/components/layout/main-layout/Layout';
import ShopTemplate from '@/src/components/templates/shop/Shop';
import { ReactElement, useEffect } from 'react';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store';
import { useRouter } from 'next/router';
import { GetProductsParamsType } from '@/src/api/product/product.type';

export default function Shop() {
  const router = useRouter();
  const {
    fetchAllProducts,
    products,
    currentPage, // Assuming these are now in the store
    totalPages,  // Assuming these are now in the store
    loading: productsLoading,
    error: productsError,
  } = useProductStore((state) => ({
    fetchAllProducts: state.fetchAllProducts,
    products: state.products,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loading: state.loading,
    error: state.error,
  }));

  const {
    fetchAllCategories,
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoryStore((state) => ({
    fetchAllCategories: state.fetchAllCategories,
    categories: state.categories,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    // Initial category fetch
    if (categories.length === 0) {
        fetchAllCategories();
    }
  }, [fetchAllCategories, categories.length]);

  useEffect(() => {
    // Fetch products based on URL query parameters
    if (router.isReady) { // Ensure router.query is populated
      const queryParams = router.query;
      const params: GetProductsParamsType = {
        page: queryParams.p ? parseInt(queryParams.p as string, 10) : 1,
        limit: 12, // Default limit
        category: queryParams.c as string | undefined,
        minPrice: queryParams.min ? parseInt(queryParams.min as string, 10) : undefined,
        maxPrice: queryParams.max ? parseInt(queryParams.max as string, 10) : undefined,
        sort: queryParams.s as string | undefined,
        // subcategory and other potential filters can be added here
      };
      fetchAllProducts(params);
    }
  }, [router.isReady, router.query, fetchAllProducts]);

  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  return (
    <ShopTemplate
      products={products}
      categories={categories}
      loading={isLoading}
      error={error?.message}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
