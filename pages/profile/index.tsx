import ProfileLayout from "@/src/components/layout/profile-layout/Layout";
import ProfileTemplate from "@/src/components/templates/profile/Profile";
import { ReactElement, useEffect } from "react";
import { useAuthStore } from "@/src/store/auth/auth.store";
import { useOrderStore } from "@/src/store/order/order.store";
import { useCategoryStore } from "@/src/store/category/category.store";
import { useRouter } from "next/router"; // Added useRouter

export default function ProfilePage() {
  const router = useRouter(); // Added router instance
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const {
    fetchOrdersByUserId,
    userOrders, // Changed from orders to userOrders
    loading: ordersLoading,
    error: ordersError,
  } = useOrderStore((state) => ({
    fetchOrdersByUserId: state.fetchOrdersByUserId,
    userOrders: state.userOrders, // Changed from state.orders to state.userOrders
    loading: state.loading,
    error: state.error,
  }));

  const {
    fetchAllCategories,
    categories, // Though categories might be used by Layout, ProfileTemplate could also need them
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategoryStore((state) => ({
    fetchAllCategories: state.fetchAllCategories,
    categories: state.categories,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    // Fetch categories if not already loaded (e.g., for Layout)
    if (categories.length === 0) {
      fetchAllCategories();
    }
  }, [fetchAllCategories, categories.length]);

  useEffect(() => {
    if (currentUser?._id && router.isReady) { // Added router.isReady check
      const sortOption = router.query.sort as string | undefined;
      // Default sort can be applied here if sortOption is undefined, e.g., 'deliveryDate-desc'
      fetchOrdersByUserId(currentUser._id, { sort: sortOption });
    }
    // Dependency: fetchOrdersByUserId, currentUser, router.isReady, and router.query for sort
  }, [currentUser, fetchOrdersByUserId, router.isReady, router.query.sort]);

  const isLoading = ordersLoading || categoriesLoading;
  // Simplistic error handling:
  const error = ordersError || categoriesError;

  // Potentially show a loading state or redirect if currentUser is null and required for the page
  if (!currentUser && !ordersLoading) {
    // This check might be too simple; auth state might have its own loading.
    // Or, ProfileTemplate handles the null currentUser case.
    // For now, assume ProfileTemplate can handle it or a redirect/auth guard is elsewhere.
  }

  return (
    <ProfileTemplate
      user={currentUser}
      orders={userOrders} // Pass userOrders as the orders prop
      categories={categories} // Pass categories if ProfileTemplate or its children need them
      loading={isLoading}
      error={error?.message}
    />
  );
}

ProfilePage.getLayout = function getLayout(page: ReactElement) { // Renamed Profile to ProfilePage
  return <ProfileLayout>{page}</ProfileLayout>;
};
