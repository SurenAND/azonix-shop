import { useAddNewOrder } from '@/src/api/orders/orders.queries';
import {
  AddOrderResponseType,
  ProductInOrderResponseType,
} from '@/src/api/orders/orders.type';
import { useUpdateProduct } from '@/src/api/product/product.queries';
import CheckoutSkeleton from '@/src/components/shared/skeletons/checkout-skeleton/CheckoutSkeleton';
import DeliveryInfoSkeleton from '@/src/components/shared/skeletons/delivery-info-skeleton/DeliveryInfoSkeleton';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { useUserStore } from '@/src/store/user/user.store';
import { UserStoreType } from '@/src/store/user/user.type';
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

const CartTemplate = () => {
  // libraries
  const { i18n } = useTranslation();
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
  const { userData, setUserData } = useUserStore();

  // mutations
  const { mutate: addNewOrder } = useAddNewOrder();
  const { mutate: updateProduct } = useUpdateProduct();

  // preFill form
  useEffect(() => {
    if (userData) {
      reset({
        firstname: userData.firstname || '',
        lastname: userData.lastname || '',
        username: userData.username || '',
        phoneNumber: userData.phoneNumber || '',
        address: userData.address || '',
      });
    }
  }, [reset, userData]);

  // function
  const handleForm = (data: FieldValues) => {
    // update user
    if (userData) {
      setUserData(data as UserStoreType);
    }

    if (paymentName === 'online' && i18n.language === 'en') {
      location.href = MainRoutes.PAYMENT_EN;
    } else if (paymentName === 'online' && i18n.language === 'fa') {
      location.href = MainRoutes.PAYMENT_FA;
    } else {
      // add new order
      addNewOrder(
        {
          user: state?.userId,
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
              ?.date.split('T')[0] || '',
        },
        {
          onSuccess: (data: AddOrderResponseType) => {
            if (data.status === 'success') {
              // remove orders from product
              data?.data.order.products.forEach(
                (item: ProductInOrderResponseType) => {
                  updateProduct({
                    productId: item.product._id,
                    data: {
                      quantity: item.product.quantity - item.count,
                    },
                  });
                },
              );
              // clear user's cart
              clearUserCart(state?.userId);
              // reset user delivery date
              resetUserDeliveryDate(state?.userId);
            }
          },
        },
      );
    }
  };

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
            shoppingCartInfo={shoppingCartInfo}
            paymentName={paymentName}
            paymentMethodSelected={paymentMethodSelected}
          />
        </div>
      </form>
    </section>
  );
};

export default CartTemplate;
