import { useGetUserById, useUpdateUser } from '@/src/api/auth/auth.queries';
import { useAddNewOrder } from '@/src/api/orders/orders.queries';
import { useUpdateProduct } from '@/src/api/product/product.queries';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { useState, lazy, Suspense } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

// Lazy load components
const Checkout = lazy(
  () => import('@/src/components/templates/cart/checkout/Checkout'),
);
const DeliveryInfo = lazy(
  () => import('@/src/components/templates/cart/delivery-info/DeliveryInfo'),
);

const CartTemplate = () => {
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<
    number | null
  >(null);
  const [paymentName, setPaymentName] = useState('');

  const {
    shoppingCartInfo,
    clearUserCart,
    deliveryDate,
    resetUserDeliveryDate,
  } = useCheckoutStore();
  const { t, i18n } = useTranslation();
  const { state } = useUserContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: oldUser } = useGetUserById(state?.userId);
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: addNewOrder } = useAddNewOrder();
  const { mutate: updateProduct } = useUpdateProduct();

  const handleForm = (data: FieldValues) => {
    // update user
    if (oldUser) {
      updateUser(
        {
          newUser: oldUser?.data.user,
          data: data,
        },
        {
          onSuccess: (data) => {
            if (data.status === 'success') {
              reset();
              toast.success(t('changes-saved'));
            }
          },
        },
      );
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
          onSuccess: (data) => {
            if (data.status === 'success') {
              // remove orders from product
              data?.data.order.products.forEach((item: any) => {
                updateProduct({
                  newProduct: item.product,
                  data: {
                    quantity: item.product.quantity - item.count,
                  },
                });
              });
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
          <Suspense fallback={<div>Loading delivery info...</div>}>
            <DeliveryInfo
              register={register}
              errors={errors}
              setPaymentMethodSelected={setPaymentMethodSelected}
              setPaymentName={setPaymentName}
              paymentMethodSelected={paymentMethodSelected}
              oldUser={oldUser}
              reset={reset}
            />
          </Suspense>
          {/* order's summary */}
          <Suspense fallback={<div>Loading checkout...</div>}>
            <Checkout
              shoppingCartInfo={shoppingCartInfo}
              paymentName={paymentName}
              paymentMethodSelected={paymentMethodSelected}
            />
          </Suspense>
        </div>
      </form>
    </section>
  );
};

export default CartTemplate;
