// import { useAddNewOrder } from '@/src/api/orders/orders.queries'; // Removed
import { useOrderStore } from '@/src/store/order/order.store'; // Added
import { AddNewOrderParamsType } from '@/src/api/orders/orders.type'; // Keep for constructing payload
import {
  AddOrderResponseType, // This type might be specific to the direct API call, may need adjustment or be part of OrderStore type
  ProductInOrderResponseType, // Same as above
} from '@/src/api/orders/orders.type';
// import { useUpdateProduct } from '@/src/api/product/product.queries'; // Removed
import { useProductStore } from '@/src/store/product/product.store'; // Added
import CheckoutSkeleton from '@/src/components/shared/skeletons/checkout-skeleton/CheckoutSkeleton';
import DeliveryInfoSkeleton from '@/src/components/shared/skeletons/delivery-info-skeleton/DeliveryInfoSkeleton';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import { useAuthStore } from '@/src/store/auth/auth.store';
import { User } from '@/src/store/auth/auth.type';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { ShoppingCartItem } from '@/src/store/checkout/checkout.type'; // Import ShoppingCartItem
import type { ProductType } from '@/src/api/product/product.type';     // Import ProductType
import type { CategoryType } from '@/src/api/category/category.type'; // Import CategoryType
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Dynamic load components
const Checkout = dynamic(
  () => import('@/src/components/templates/cart/checkout/Checkout'),
  { loading: () => <CheckoutSkeleton /> },
);
const DeliveryInfo = dynamic(
  () => import('@/src/components/templates/cart/delivery-info/DeliveryInfo'),
  { loading: () => <DeliveryInfoSkeleton /> },
);

export interface CartTemplateProps {
  // shoppingCartInfo is still primarily from useCheckoutStore as per task note
  // but if we were to pass it, it would be:
  // shoppingCartInfo: ShoppingCartItem[];
  allProducts: ProductType[];
  allCategories: CategoryType[]; // For layout or other context
  loading: boolean; // Loading status for allProducts/allCategories
  error?: string | null; // Error status for allProducts/allCategories
}

const CartTemplate = ({ allProducts, allCategories, loading, error }: CartTemplateProps) => {
  // libraries
  const { i18n, t } = useTranslation(); // Added t for potential error display
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // states
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<
    number | null
  >(null);
  const [paymentName, setPaymentName] = useState<string>('');

  // contexts & stores
  const { state } = useUserContext();
  const {
    shoppingCartInfo,
    clearUserCart,
    deliveryDate,
    resetUserDeliveryDate,
  } = useCheckoutStore();
  const { currentUser, updateUser } = useAuthStore();
  const orderStore = useOrderStore(); // Added for addOrder
  const productStore = useProductStore(); // Added for updateProduct

  // mutations (React Query ones are removed, using store actions now)
  // const { mutate: addNewOrder } = useAddNewOrder(); // Removed
  // const { mutate: updateProduct } = useUpdateProduct(); // Removed


  // preFill form
  useEffect(() => {
    if (currentUser) {
      reset({
        firstname: currentUser.firstname || '',
        lastname: currentUser.lastname || '',
        username: currentUser.username || '',
        phoneNumber: currentUser.phoneNumber || '',
        address: currentUser.address || '',
      });
    }
  }, [reset, currentUser]);

  // function
  const handleForm = async (data: FieldValues) => { // Made async
    // update user
    if (currentUser) {
      // Assuming updateUser in useAuthStore is synchronous or doesn't need await here
      updateUser(data as User);
    }

    if (paymentName === 'online' && i18n.language === 'en') {
      location.href = MainRoutes.PAYMENT_EN;
    } else if (paymentName === 'online' && i18n.language === 'fa') {
      location.href = MainRoutes.PAYMENT_FA;
    } else {
      const orderPayload: AddNewOrderParamsType = {
        user: state?.userId || '', // Ensure userId is not undefined
        products: shoppingCartInfo
          .filter((item) => item.userId === state.userId)
          .map((item) => ({
            product: item._id,
            count: item.quantity,
          })),
        deliveryStatus: false,
        deliveryDate:
          deliveryDate
            .find((item) => item.userId === state.userId)
            ?.date.split('T')[0] || new Date().toISOString().split('T')[0], // Ensure valid date
      };

      try {
        // Call addOrder from the store
        // The addOrder action in the store should return the new order or relevant data
        // For now, assuming it returns something similar to AddOrderResponseType or null on failure
        const newOrderResponse = await orderStore.addOrder(orderPayload);

        if (newOrderResponse) { // Check if order placement was successful (adjust based on actual return type)
          // The structure of newOrderResponse might be different from the direct API call's data.
          // Assuming newOrderResponse is similar to OrderType and contains products array.
          // Let's assume newOrderResponse is the created OrderType object.
          const orderedProducts = newOrderResponse.products; // This needs to match the structure of OrderType.products

          // Update product quantities
          // This part requires careful handling of product data structure
          // The original `ProductInOrderResponseType` had item.product._id and item.product.quantity (original stock)
          // The `OrderType.products` might have a different structure.
          // For now, we assume `orderedProducts` contains items with `product._id` and `count`.
          // We also need the original stock, which is not directly available on `OrderType.products`.
          // This stock update logic might be better handled server-side or by fetching product details before updating.
          // For simplicity, if `updateProduct` in store can handle just decrementing, we might not need original stock here.
          // The current `useProductStore.updateProduct` takes (productId, data: Partial<Product> | FormData)
          // This is a simplification and might need more robust stock management.

          // The `newOrderResponse.products` array contains items where `item.product` is the ProductType object
          // as it was when the order was created by the local addOrder action.
          // This embedded product object includes its quantity before this order.
          for (const orderedItem of orderedProducts) {
            // Ensure orderedItem.product is treated as ProductType
            const productToUpdate = orderedItem.product as ProductType;

            if (productToUpdate && typeof productToUpdate.quantity === 'number' && typeof orderedItem.count === 'number') {
              const stockBeforeThisOrder = productToUpdate.quantity;
              const newStock = stockBeforeThisOrder - orderedItem.count;

              // productStore.updateProduct is synchronous now, await is not strictly needed but harmless
              await productStore.updateProduct(productToUpdate._id, {
                quantity: newStock,
              });
            } else {
              console.warn('Skipping stock update for an item due to missing data:', orderedItem);
            }
          }

          if (state?.userId) {
            clearUserCart(state.userId);
            resetUserDeliveryDate(state.userId);
          }
          // Optionally, navigate to an order confirmation page or show a success message
          // pushRouter(MainRoutes.ORDER_CONFIRMATION_OR_PROFILE);
        } else {
          // Handle order placement failure (e.g., show a toast notification)
          console.error("Order placement failed");
        }
      } catch (error) {
        console.error("Error during order placement or product update:", error);
        // Show error to user
      }
    }
  };

  // Display error for allProducts/allCategories loading if it occurs
  if (error) {
    return (
      <section className='bg-axGray py-8 dark:bg-gray-900 md:py-16'>
        <div className='mx-auto max-w-screen-xl px-4 2xl:px-0 text-center text-red-500'>
          <p>{t('error_loading_data', { ns: 'common' })}: {error}</p>
          <p>{t('cart_functionality_limited', { ns: 'common' })}</p>
        </div>
      </section>
    );
  }

  // Potentially show a loading indicator for the whole page if allProducts are essential for cart display
  // and are not yet loaded. For now, assuming Checkout component handles missing details gracefully or
  // shoppingCartInfo itself has enough data for primary display.
  // if (loading && allProducts.length === 0) {
  //   return (
  //     <section className='bg-axGray py-8 dark:bg-gray-900 md:py-16'>
  //       <div className='mx-auto max-w-screen-xl px-4 2xl:px-0 text-center'>
  //         <p>{t('loading_cart_details', { ns: 'common' })}</p>
  //       </div>
  //     </section>
  //   );
  // }


  return (
    <section className='bg-axGray py-8 dark:bg-gray-900 md:py-16'>
      <form
        onSubmit={handleSubmit(handleForm)}
        className='mx-auto max-w-screen-xl px-4 2xl:px-0'
      >
        <div className='mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-6 xl:gap-10'>
          {/* delivery info */}
          <DeliveryInfo
            register={register}
            errors={errors}
            setPaymentMethodSelected={setPaymentMethodSelected}
            setPaymentName={setPaymentName}
            paymentMethodSelected={paymentMethodSelected}
          />

          {/* order's summary */}
          <Checkout
            shoppingCartInfo={shoppingCartInfo} // Sourced from useCheckoutStore
            allProducts={allProducts} // Pass allProducts for potential lookup
            paymentName={paymentName}
            paymentMethodSelected={paymentMethodSelected}
          />
        </div>
      </form>
    </section>
  );
};

export default CartTemplate;
