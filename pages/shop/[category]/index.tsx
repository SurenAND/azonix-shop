import Layout from '@/src/components/layout/main-layout/Layout';
import CategoryTemplate from '@/src/components/templates/category/Category';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store';
import { CategoryType } from '@/src/api/category/category.type';

export default function ShopCategoryPage() {
  const router = useRouter();
  const { category: categorySlug } = router.query;

  const {
    fetchAllProducts,
    products,
    currentPage, // Added
    totalPages,  // Added
    loading: productsLoading,
    error: productsError,
  } = useProductStore((state) => ({
    fetchAllProducts: state.fetchAllProducts,
    products: state.products,
    currentPage: state.currentPage, // Added
    totalPages: state.totalPages,   // Added
    loading: state.loading,
    error: state.error,
  }));

  const {
    fetchAllCategories,
    fetchSubcategoriesByCategory,
    categories,
    subcategories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoryStore((state) => ({
    fetchAllCategories: state.fetchAllCategories,
    fetchSubcategoriesByCategory: state.fetchSubcategoriesByCategory,
    categories: state.categories,
    subcategories: state.subcategories,
    loading: state.loading,
    error: state.error,
  }));

  const [currentCategory, setCurrentCategory] = useState<CategoryType | null>(null);

  useEffect(() => {
    // Fetch all categories if not already loaded or if slug changes
    // This simple check might need refinement based on global state strategy
    if (categories.length === 0) {
      fetchAllCategories();
    }
  }, [fetchAllCategories, categories.length]);

  useEffect(() => {
    if (typeof categorySlug === 'string' && categories.length > 0) {
      const foundCategory = categories.find(c => c.slugname === categorySlug);
      if (foundCategory) {
        setCurrentCategory(foundCategory);
        // Initial subcategory fetch for the found category
        fetchSubcategoriesByCategory({ category: foundCategory._id });

        // Product fetching will be handled by the next useEffect, triggered by currentCategory or router.query
      } else {
        setCurrentCategory(null);
      }
    }
  }, [categorySlug, categories, fetchSubcategoriesByCategory]); // Removed fetchAllProducts from here

  useEffect(() => {
    // Fetch products when currentCategory is set or router.query changes for filters/pagination
    if (currentCategory?._id && router.isReady) {
      const queryParams = router.query;
      const params = {
        page: queryParams.p ? parseInt(queryParams.p as string, 10) : 1,
        limit: 9, // Default limit for this page
        category: currentCategory._id, // Always filter by the current category
        subcategory: queryParams.sc as string | undefined,
        minPrice: queryParams.min ? parseInt(queryParams.min as string, 10) : undefined,
        maxPrice: queryParams.max ? parseInt(queryParams.max as string, 10) : undefined,
        sort: queryParams.s as string | undefined,
      };
      fetchAllProducts(params);
    }
    // If currentCategory becomes null (e.g. invalid slug), ideally clear products or handle error
    // For now, fetchAllProducts might be called with undefined category if currentCategory is null,
    // which the store/API should handle (e.g., return no products or all products if not desired).
    // The check for currentCategory._id should prevent this.
  }, [currentCategory, router.isReady, router.query, fetchAllProducts]);

  if (router.isFallback || (!currentCategory && typeof categorySlug === 'string' && (categoriesLoading || productsLoading))) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }

  if (typeof categorySlug !== 'string') {
    // Should ideally be caught by router or show a 404
    return <div>Invalid category path.</div>;
  }

  if (!currentCategory && !categoriesLoading && !productsLoading) {
    return <div>Category not found.</div>;
  }

  // Combine loading and error states
  const isLoading = productsLoading || categoriesLoading;
  const error = productsError || categoriesError;

  return (
    <CategoryTemplate
      categorySlug={categorySlug}
      currentCategory={currentCategory}
      products={products}
      subcategories={subcategories}
      loading={isLoading}
      error={error?.message}
      categories={categories} // Pass all categories for potential sidebar
      currentPage={currentPage} // Pass pagination prop
      totalPages={totalPages}   // Pass pagination prop
    />
  );
}

ShopCategoryPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
