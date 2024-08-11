import { useAddNewOrder } from '@/src/api/orders/orders.queries';
import { ProductInOrderResponseType } from '@/src/api/orders/orders.type';
import { useUpdateProduct } from '@/src/api/product/product.queries';
import ShaparakLogo from '@/src/assets/images/ShaparakLogo.jpg';
import Timer from '@/src/components/shared/timer/Timer';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaArrowRotateRight, FaRegClock, FaRegMessage } from 'react-icons/fa6';
import Image from 'next/image';

type FormInputs = {
  cardNumber: string;
  cvv2: string;
  expirationMonth: string;
  expirationYear: string;
  securityCode: string;
  secondPassword: string;
  email: string;
};

const PaymentFa = () => {
  // libraries
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  // contexts & stores
  const { state } = useUserContext();
  const {
    shoppingCartInfo,
    clearUserCart,
    deliveryDate,
    resetUserDeliveryDate,
  } = useCheckoutStore();

  // mutations
  const { mutate: addNewOrder } = useAddNewOrder();
  const { mutate: updateProduct } = useUpdateProduct();

  // functions
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
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
            location.href = MainRoutes.PAYMENT_RESULT + '?result=successful';
          }
        },
      },
    );
  };

  const handleCancel = () => {
    location.href = MainRoutes.PAYMENT_RESULT + '?result=failed';
  };

  return (
    <div dir='rtl'>
      <header className='flex gap-4 border-t-4 border-pink-400 sm:gap-8'>
        <Image
          src={ShaparakLogo.src}
          alt='درگاه اینترنتی سپهر'
          width={80}
          height={80}
          className='max-w-[4rem] p-1 sm:max-w-[5rem] sm:p-2'
        />
        <h1 className='inline-block rounded-b-xl bg-pink-400 p-2 text-white sm:p-4'>
          درگاه اینترنتی پرداخت الکترونیک سپهر
        </h1>
      </header>
      <main className='mx-2 my-16 flex max-w-[40rem] flex-col gap-4 border-4 border-gray-300 p-2 text-xs sm:mx-auto'>
        <div className='mb-4 grid grid-cols-3 items-center'>
          <h1 className='col-span-1 w-2/3 border-b-2 border-red-500 bg-[#fef1ff] px-1 py-2 font-bold text-pink-600 sm:w-1/2 sm:px-2 sm:text-base'>
            اطلاعات کارت
          </h1>
          <div className='col-span-2 flex items-center gap-2 sm:px-8'>
            <FaRegClock className='h-5 w-5 text-blue-800' />
            <p className='font-semibold text-blue-800'>مدت زمان باقی مانده :</p>
            <div className='font-semibold text-blue-800'>
              <Timer time={180} action={handleCancel} />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          {/* card number */}
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1'>
              <p className='font-bold text-blue-900'>شماره کارت :</p>
              <p className='hidden text-xs text-gray-400 sm:block'>
                شماره ۱۶ رقمی درج شده بر روی کارت
              </p>
            </div>
            <input
              {...register('cardNumber', {
                required: true,
                pattern: /^\d{16}$/,
              })}
              className='col-span-2 max-w-[20rem] rounded border p-1'
            />
            {errors.cardNumber && (
              <span className='text-red-500'>شماره کارت معتبر نیست</span>
            )}
          </div>
          {/* card cvv */}
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1'>
              <p className='font-bold text-blue-900'>
                شماره شناسایی دوم (cvv2) :
              </p>
              <p className='hidden text-xs text-gray-400 sm:block'>
                شماره ۳ یا ۴ رقمی درج شده بر روی کارت
              </p>
            </div>
            <input
              {...register('cvv2', { required: true, pattern: /^\d{3,4}$/ })}
              className='col-span-2 max-w-[20rem] rounded border p-1'
            />
            {errors.cvv2 && (
              <span className='text-red-500'>شماره شناسایی دوم معتبر نیست</span>
            )}
          </div>
          {/* card date */}
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1'>
              <p className='font-bold text-blue-900'>تاریخ انقضای کارت :</p>
              <p className='hidden text-xs text-gray-400 sm:block'>
                دو رقم ماه / دو رقم آخر سال را وارد کنید .
              </p>
            </div>
            <div className='col-span-2 flex items-center gap-2 '>
              <input
                {...register('expirationMonth', {
                  required: true,
                  pattern: /^(0[1-9]|1[0-2])$/,
                })}
                className='max-w-[3rem] rounded border p-1'
              />
              /
              <input
                {...register('expirationYear', {
                  required: true,
                  pattern: /^(20|19)\d{2}$/,
                })}
                className='max-w-[3rem] rounded border p-1'
              />
            </div>
            {errors.expirationMonth && (
              <span className='text-red-500'>ماه معتبر نیست</span>
            )}
            {errors.expirationYear && (
              <span className='text-red-500'>سال معتبر نیست</span>
            )}
          </div>
          {/* card security code */}
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1'>
              <p className='font-bold text-blue-900'> کد امنیتی :</p>
              <p className='hidden text-xs text-gray-400 sm:block'>
                کد وارد شده در کادر روبه رو را وارد کنید .
              </p>
            </div>
            <div className='col-span-2 flex items-center gap-2 '>
              <input
                {...register('securityCode', {
                  required: true,
                  pattern: /^\d{5}$/,
                })}
                type='text'
                className='max-w-[5rem] rounded border p-1'
              />
              <p className='max-w-[4rem] rounded bg-gray-100 px-4 py-1'>
                88402
              </p>
              <FaArrowRotateRight className='w-4' />
            </div>
            {errors.securityCode && (
              <span className='text-red-500'>کد امنیتی معتبر نیست</span>
            )}
          </div>
          {/* card password */}
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1'>
              <p className='font-bold text-blue-900'>رمز دوم (رمز اینترنتی):</p>
              <p className='hidden text-xs text-gray-400 sm:block'>
                رمز پویا رمز یکبار مصرفی ست که به جای رمز دوم استفاده می شود .
              </p>
            </div>
            <div className='col-span-2 flex items-center gap-2'>
              <input
                {...register('secondPassword', {
                  required: true,
                  pattern: /^\d{5}$/,
                })}
                className='max-w-[5rem] rounded border p-1'
              />
              <div className='flex max-w-[8rem] gap-2 rounded border p-1'>
                <FaRegMessage className='w-4 text-blue-800' />
                <p className='text-blue-800'>درخواست رمز پویا</p>
              </div>
            </div>
            {errors.secondPassword && (
              <span className='text-red-500'>رمز دوم معتبر نیست</span>
            )}
          </div>
          {/* card email */}
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1'>
              <p className='font-bold text-blue-900'>ایمیل (اختیاری) :</p>
              <p className='hidden text-xs text-gray-400 sm:block'>
                رسید پرداخت به این آدرس ایمیل خواهد شد .
              </p>
            </div>
            <input
              {...register('email', { pattern: /^\S+@\S+$/i })}
              className='col-span-2 max-w-[20rem] rounded border p-1'
            />
            {errors.email && (
              <span className='text-red-500'>ایمیل معتبر نیست</span>
            )}
          </div>

          {/* buttons */}
          <div className='mb-8 grid max-w-[33rem] grid-cols-3 gap-2'>
            <button
              type='submit'
              className='col-span-2 w-full rounded-lg bg-axBlue p-3 font-semibold text-white shadow-lg hover:bg-axBlue/80 focus:outline-none'
            >
              پرداخت
            </button>
            <button
              type='button'
              className='col-span-1 w-full rounded-lg bg-primary/90 p-3 font-semibold text-white shadow-lg hover:bg-primary focus:outline-none'
              onClick={handleCancel}
            >
              انصراف
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PaymentFa;
