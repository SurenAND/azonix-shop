import Layout from '@/src/components/layout/main-layout/Layout';
import CartTemplate from '@/src/components/templates/cart/Cart';
import { ReactElement, useEffect } from 'react';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store';
import useCheckoutStore from '@/src/store/checkout/checkout.store'; // To get cart items

export default function CartPage() { // Renamed Cart to CartPage for clarity
  const {
    fetchAllProducts,
    products,
    loading: productsLoading,
    error: productsError,
  } = useProductStore((state) => ({
    fetchAllProducts: state.fetchAllProducts,
    products: state.products,
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

  // Get cart items from checkout store
  const shoppingCartInfo = useCheckoutStore((state) => state.shoppingCartInfo);

  useEffect(() => {
    // Fetch categories if not already loaded (e.g., for Layout)
    if (categories.length === 0) {
      fetchAllCategories();
    }
    // Fetch products if not already loaded.
    // This ensures CartTemplate can look up full product details if needed.
    // A large limit is used assuming all cartable products should be available.
    // This could be optimized if product details in shoppingCartInfo are sufficient
    // or by fetching only specific product IDs from the cart.
    if (products.length === 0) {
      fetchAllProducts({ page: 1, limit: 100 }); // Adjust limit as appropriate
    }
  }, [fetchAllCategories, categories.length, fetchAllProducts, products.length]);

  const isLoading = productsLoading || categoriesLoading;
  // Simplistic error handling, consider combining or prioritizing errors
  const error = productsError || categoriesError;

  return (
    <CartTemplate
      shoppingCartInfo={shoppingCartInfo}
      allProducts={products} // Pass the general list of products
      allCategories={categories} // Pass categories for layout/breadcrumbs
      loading={isLoading}
      error={error?.message}
    />
  );
}

CartPage.getLayout = function getLayout(page: ReactElement) { // Renamed Cart to CartPage
  return <Layout>{page}</Layout>;
};
