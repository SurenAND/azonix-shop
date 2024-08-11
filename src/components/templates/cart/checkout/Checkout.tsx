import Loading from '@/src/components/shared/loading/Loading';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import { ShoppingCartItem } from '@/src/store/checkout/checkout.type';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CartCard = dynamic(
  () => import('@/src/components/templates/cart/cart-card/CartCard'),
  { loading: () => <Loading /> },
);

type CheckoutPropsType = {
  shoppingCartInfo: ShoppingCartItem[];
  paymentName: string;
  paymentMethodSelected: number | null;
};

const Checkout = ({
  shoppingCartInfo,
  paymentName,
  paymentMethodSelected,
}: CheckoutPropsType) => {
  // libraries
  const { t } = useTranslation();

  // states
  const [subtotal, setSubtotal] = useState<number>(0);
  const [savings, setSavings] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // contexts
  const { state } = useUserContext();

  // calculate the total price and savings of the cart
  useEffect(() => {
    setSubtotal(
      shoppingCartInfo
        ?.filter((item) => item?.userId === state.userId)
        ?.reduce((acc, item) => acc + item?.price * item.quantity, 0),
    );
    setTotal(
      shoppingCartInfo
        ?.filter((item) => item?.userId === state.userId)
        ?.reduce(
          (acc, item) => acc + item?.priceAfterDiscount * item.quantity,
          0,
        ),
    );
    setSavings(subtotal - total);
  }, [shoppingCartInfo, total, subtotal]);

  return (
    <div className='mt-6 w-full flex-1 space-y-5 sm:mt-8 lg:mt-0'>
      <h3 className='text-md font-semibold text-gray-900 dark:text-white'>
        {t('order-summary')}
      </h3>
      <div className='ms-2 flex flex-col gap-12 rounded-lg bg-white p-5 dark:bg-gray-800'>
        {/* cart items */}
        <div className='max-h-[300px] space-y-3 overflow-y-auto p-3'>
          {shoppingCartInfo
            ?.filter((item) => item?.userId === state.userId)
            ?.map((item) => <CartCard key={item?._id} product={item} />)}
        </div>

        {/* prices */}
        <div className='flow-root'>
          <div className='-my-3 divide-y divide-gray-200 dark:divide-gray-800'>
            <dl className='flex items-center justify-between gap-4 py-3'>
              <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                {t('subtotal')}
              </dt>
              <dd className='text-base font-medium text-gray-900 dark:text-white'>
                {subtotal.toFixed(2)}
                {t('currency')}
              </dd>
            </dl>

            <dl className='flex items-center justify-between gap-4 py-3'>
              <dt className='text-base font-normal text-gray-500 dark:text-gray-400'>
                {t('savings')}
              </dt>
              <dd className='text-base font-medium text-green-500'>
                {savings.toFixed(2)}
                {t('currency')}
              </dd>
            </dl>

            <dl className='flex items-center justify-between gap-4 py-3'>
              <dt className='text-base font-bold text-gray-900 dark:text-white'>
                {t('total')}
              </dt>
              <dd className='text-base font-bold text-gray-900 dark:text-white'>
                {total.toFixed(2)}
                {t('currency')}
              </dd>
            </dl>
          </div>
        </div>

        {/* proceed to payment */}
        <div className='space-y-3'>
          <button
            type='submit'
            className='flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4  focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary'
            disabled={
              !state.isLogin ||
              paymentMethodSelected === null ||
              shoppingCartInfo?.filter((item) => item?.userId === state?.userId)
                ?.length === 0
            }
          >
            {paymentName === 'online'
              ? t('proceed-to-payment')
              : t('confirm-order')}
          </button>

          {/* if the user is not logged in, redirect to the login page */}
          {!state.isLogin && (
            <p className='text-sm font-normal text-gray-500 dark:text-gray-400'>
              {t('cart-require-account-part-1')}
              <Link
                href={`${MainRoutes.REGISTER}`}
                title={t('cart-require-account-part-2')}
                className='text-primary-700 dark:text-primary-500 ms-1 font-medium underline hover:no-underline'
              >
                {t('cart-require-account-part-2')}
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
