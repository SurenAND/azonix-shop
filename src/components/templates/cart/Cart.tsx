import { useGetUserById, useUpdateUser } from '@/src/api/auth/auth.queries';
import { useAddNewOrder } from '@/src/api/orders/orders.queries';
import { useUpdateProduct } from '@/src/api/product/product.queries';
import Checkout from '@/src/components/templates/cart/checkout/Checkout';
import DeliveryInfo from '@/src/components/templates/cart/delivery-info/DeliveryInfo';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const CartTemplate = () => {
  const [deliveryDate, setDeliveryDate] = useState<string>();
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<
    number | null
  >(null);
  const [paymentName, setPaymentName] = useState('');

  const { shoppingCartInfo, clearUserCart } = useCheckoutStore();
  const { push: pushRouter } = useRouter();
  const { t } = useTranslation();
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

    if (paymentName === 'online') {
      pushRouter(MainRoutes.PAYMENT);
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
          deliveryDate: deliveryDate?.split('T')[0] || '',
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
            setDeliveryDate={setDeliveryDate}
            setPaymentMethodSelected={setPaymentMethodSelected}
            setPaymentName={setPaymentName}
            paymentMethodSelected={paymentMethodSelected}
            oldUser={oldUser}
            reset={reset}
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
