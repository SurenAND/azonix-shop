import Layout from '@/src/components/layout/main-layout/Layout';
import ProductTemplate from '@/src/components/templates/product/Product';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store'; // If categories are needed

export default function ShopProductPage() {
  const router = useRouter();
  const { product: productId } = router.query; // product slug is the productId

  const {
    fetchProductById,
    product, // This should be the state for a single product, e.g., currentProduct or productDetail
    loading: productLoading,
    error: productError,
  } = useProductStore((state) => ({
    fetchProductById: state.fetchProductById,
    product: state.product, // Assuming 'product' holds the fetched single product details in your store
    loading: state.loading,
    error: state.error,
  }));

  const {
    fetchAllCategories,
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoryStore((state) => ({ // Assuming categories might be needed for breadcrumbs/etc.
    fetchAllCategories: state.fetchAllCategories,
    categories: state.categories,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    if (typeof productId === 'string') {
      fetchProductById(productId);
    }
    // Fetch categories if they are not already loaded and are needed for the template
    // This simple check might need refinement
    if (categories.length === 0) {
        fetchAllCategories();
    }
  }, [productId, fetchProductById, fetchAllCategories, categories.length]);

  if (router.isFallback || productLoading || (!product && typeof productId === 'string')) {
    return <div>Loading product details...</div>; // Or a proper skeleton loader
  }

  if (typeof productId !== 'string' && !productLoading) {
     // This case should ideally not be reached if routing is set up correctly.
    return <div>Invalid product ID.</div>;
  }

  if (productError) {
    return <div>Error loading product: {productError}</div>;
  }

  if (!product && !productLoading) {
    return <div>Product not found.</div>;
  }

  // Combine loading and error states if necessary, though product-specific ones are more direct here
  const isLoading = productLoading || categoriesLoading;
  // A more specific error might be better, but for simplicity:
  const error = productError || (categoriesError ? categoriesError.message : null);


  return (
    <ProductTemplate
      product={product} // Pass the fetched product object
      categories={categories} // Pass categories if ProductTemplate uses them
      loading={isLoading}
      error={error}
    />
  );
}

ShopProductPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
