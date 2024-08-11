import { useAddNewOrder } from '@/src/api/orders/orders.queries';
import { ProductInOrderResponseType } from '@/src/api/orders/orders.type';
import { useUpdateProduct } from '@/src/api/product/product.queries';
import CardBackground from '@/src/assets/images/card-bg.jpeg';
import Chip from '@/src/assets/images/chip.png';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  cardNumber: string;
  cardHolder: string;
  cardMonth: string;
  cardYear: string;
  cardCvv: string;
};

const CreditCardForm = () => {
  // constants
  const minCardYear = new Date().getFullYear();

  // libraries
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();
  const watchedFields = watch();

  // states
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  // mutations
  const { mutate: addNewOrder } = useAddNewOrder();
  const { mutate: updateProduct } = useUpdateProduct();

  // contexts & stores
  const { state } = useUserContext();
  const {
    shoppingCartInfo,
    clearUserCart,
    deliveryDate,
    resetUserDeliveryDate,
  } = useCheckoutStore();

  // functions
  const flipCard = (status: boolean) => {
    setIsCardFlipped(status);
  };

  const generateCardNumberMask = (number: string) => {
    const mask = '#### #### #### ####';
    let maskedNumber = '';
    let numberIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      if (mask[i] === '#') {
        maskedNumber += number[numberIndex] || '#';
        numberIndex++;
      } else {
        maskedNumber += mask[i];
      }
    }

    return maskedNumber;
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
            clearUserCart(state?.userId);
            resetUserDeliveryDate(state?.userId);
            location.href = MainRoutes.PAYMENT_RESULT + '?result=successful';
          }
        },
      },
    );
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-axLightPurple'>
      <div className='relative mt-16 w-full max-w-xl flex-col items-center justify-center'>
        {/* card */}
        <div className='absolute -top-16 left-1/2 mx-auto my-0 h-[220px] w-[350px] -translate-x-1/2 rounded-xl bg-cover bg-center transition-transform duration-200'>
          <div
            className={`perspective-1000 preserve-3d relative mx-auto my-0 h-[220px] w-[350px] rounded-xl bg-cover bg-center transition-transform duration-200 ${isCardFlipped ? 'rotate-y-180' : ''}`}
            style={{ backgroundImage: `url(${CardBackground.src})` }}
          >
            {/* front */}
            <div className='backface-hidden absolute flex h-full w-full flex-col justify-between rounded-xl bg-white/10 p-5 text-white'>
              {/* card info */}
              <div className='flex justify-between p-4'>
                <Image src={Chip} width={48} height={48} alt='Card Chip' />
                <div className='w-12 text-right text-lg font-bold'>VISA</div>
              </div>
              {/* card number */}
              <label
                htmlFor='cardNumber'
                className='mt-5 block cursor-pointer px-4 py-2 text-center font-mono text-2xl'
              >
                {generateCardNumberMask(watchedFields.cardNumber || '')}
              </label>
              {/* card holder */}
              <div className='flex justify-between'>
                <label htmlFor='cardHolder' className='block'>
                  <div className='text-xs font-bold'>Card Holder</div>
                  <div className='mt-1 cursor-pointer text-sm'>
                    {watchedFields.cardHolder || 'FULL NAME'}
                  </div>
                </label>
                {/* card date */}
                <label htmlFor='cardDate' className='block'>
                  <div className='text-xs font-bold'>Expires</div>
                  <div className='mt-1 text-sm'>
                    {watchedFields.cardMonth || 'MM'} /{' '}
                    {watchedFields.cardYear || 'YY'}
                  </div>
                </label>
              </div>
            </div>
            {/* back */}
            <div className='backface-hidden rotate-y-180 absolute flex h-full w-full flex-col justify-between rounded-xl bg-black/10 p-5 text-white'>
              <div className='mb-2 h-10 bg-black/50'></div>
              {/* card cvv */}
              <div className='flex items-center justify-between'>
                <label className='text-sm font-bold'>CVV</label>
                <div className='flex h-8 w-20 items-center justify-center rounded-sm bg-white/20 text-xl'>
                  {Array.from({
                    length: watchedFields.cardCvv?.length || 0,
                  }).map((_, i) => (
                    <span key={i}>*</span>
                  ))}
                </div>
              </div>
              {/* card type */}
              <div className='text-right text-sm'>VISA</div>
            </div>
          </div>
        </div>

        {/* inputs */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-12 rounded-lg bg-white p-8 pt-28 shadow-lg'
        >
          {/* card number */}
          <div className='mb-6'>
            <label
              htmlFor='cardNumber'
              className='mb-2 block text-sm font-semibold text-gray-700'
            >
              Card Number
            </label>
            <input
              type='text'
              id='cardNumber'
              className='w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring'
              {...register('cardNumber', {
                required: true,
                pattern: {
                  value: /^\d{16}$/,
                  message: 'Card number must be 16 digits',
                },
              })}
              maxLength={16}
              autoComplete='off'
            />
            {errors.cardNumber && (
              <p className='text-xs text-rose-400'>
                {errors.cardNumber.message}
              </p>
            )}
          </div>
          {/* card holder */}
          <div className='mb-6'>
            <label
              htmlFor='cardHolder'
              className='mb-2 block text-sm font-semibold text-gray-700'
            >
              Card Holder
            </label>
            <input
              type='text'
              id='cardHolder'
              className='w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring'
              {...register('cardHolder', {
                required: true,
              })}
              maxLength={30}
              autoComplete='off'
            />
            {errors.cardHolder && (
              <p className='text-xs text-rose-400'>
                {errors.cardHolder.message}
              </p>
            )}
          </div>
          {/* card date */}
          <div className='mb-6 flex'>
            <div className='mr-2 flex-1'>
              <label
                htmlFor='cardMonth'
                className='mb-2 block text-sm font-semibold text-gray-700'
              >
                Expiration Date
              </label>
              <select
                id='cardMonth'
                className='w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring'
                {...register('cardMonth', {
                  required: true,
                })}
              >
                <option value='' disabled selected>
                  Month
                </option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month < 10 ? `0${month}` : month}>
                    {month < 10 ? `0${month}` : month}
                  </option>
                ))}
              </select>
              {errors.cardMonth && (
                <p className='text-xs text-rose-400'>
                  {errors.cardMonth.message}
                </p>
              )}
            </div>
            <div className='ml-2 flex-1'>
              <label
                htmlFor='cardYear'
                className='mb-2 block text-sm font-semibold text-gray-700'
              >
                Year
              </label>
              <select
                id='cardYear'
                className='w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring'
                {...register('cardYear', {
                  required: true,
                })}
              >
                <option value='' disabled selected>
                  Year
                </option>
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={minCardYear + i}>
                    {minCardYear + i}
                  </option>
                ))}
              </select>
              {errors.cardYear && (
                <p className='text-xs text-rose-400'>
                  {errors.cardYear.message}
                </p>
              )}
            </div>
          </div>
          {/* card cvv */}
          <div className='mb-6'>
            <label
              htmlFor='cardCvv'
              className='mb-2 block text-sm font-semibold text-gray-700'
            >
              CVV
            </label>
            <input
              type='text'
              id='cardCvv'
              className='w-full rounded-lg border p-3 focus:border-blue-300 focus:outline-none focus:ring'
              {...register('cardCvv', {
                required: true,
                pattern: { value: /^\d{4}$/, message: 'CVV must be 4 digits' },
              })}
              onFocus={() => flipCard(true)}
              onBlur={() => flipCard(false)}
              maxLength={4}
              autoComplete='off'
            />
            {errors.cardCvv && (
              <p className='text-xs text-rose-400'>{errors.cardCvv.message}</p>
            )}
          </div>
          {/* buttons */}
          <div className='flex justify-between gap-5'>
            <button
              type='button'
              className='w-full rounded-lg bg-primary/90 p-3 font-semibold text-white shadow-lg hover:bg-primary focus:outline-none'
              onClick={() =>
                (location.href = MainRoutes.PAYMENT_RESULT + '?result=failed')
              }
            >
              Cancel
            </button>
            <button
              type='submit'
              className='w-full rounded-lg bg-axBlue p-3 font-semibold text-white shadow-lg hover:bg-axBlue/80 focus:outline-none'
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditCardForm;
