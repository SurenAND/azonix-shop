import Loading from '@/src/components/shared/loading/Loading';
import { paymentMethodData } from '@/src/constant/paymentMethodData';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const DataPickerInput = dynamic(
  () => import('@/src/components/shared/date-picker-input/DataPickerInput'),
  { loading: () => <Loading /> },
);

type DeliveryInfoPropsType = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  paymentMethodSelected: number | null;
  setPaymentName: Dispatch<SetStateAction<string>>;
  setPaymentMethodSelected: Dispatch<SetStateAction<number | null>>;
};

const DeliveryInfo = ({
  register,
  errors,
  setPaymentName,
  setPaymentMethodSelected,
  paymentMethodSelected,
}: DeliveryInfoPropsType) => {
  // libraries
  const { t, i18n } = useTranslation();

  // change the payment method
  function paymentMethodChange(i: number, name: string) {
    setPaymentMethodSelected(i);
    setPaymentName(name);
  }

  return (
    <div className='min-w-0 flex-1 space-y-8'>
      {/* user info */}
      <div className='space-y-4'>
        <h2 className='text-md font-semibold text-gray-900 dark:text-white'>
          {t('delivery-details')}
        </h2>

        <div className='ms-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 dark:bg-gray-800 sm:grid-cols-2'>
          {/* User First Name */}
          <div className='flex flex-col'>
            <label className='mb-2 dark:text-gray-300'>
              {t('user-first-name')}
            </label>
            <input
              type='text'
              {...register('firstname', {
                required: true,
              })}
              className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            />
            {/* first name error message */}
            <p
              className={`text-xs text-rose-400 ${
                errors.firstname ? 'visible' : 'invisible'
              }`}
            >
              {t('user-first-name-input-error')}
            </p>
          </div>
          {/* User Last Name */}
          <div className='flex flex-col'>
            <label className='mb-2 dark:text-gray-300'>
              {t('user-last-name')}
            </label>
            <input
              type='text'
              {...register('lastname', {
                required: true,
              })}
              className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            />
            {/* last name error message */}
            <p
              className={`text-xs text-rose-400 ${
                errors.lastname ? 'visible' : 'invisible'
              }`}
            >
              {t('user-last-name-input-error')}
            </p>
          </div>
          {/* User Phone Number */}
          <div className='flex flex-col'>
            <label className='mb-2 dark:text-gray-300'>
              {t('user-phone-number')}
            </label>
            <input
              type='text'
              {...register('phoneNumber', {
                required: true,
                pattern: /^[0-9]+$/,
              })}
              className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            />
            {/* phone number error message */}
            <p
              className={`text-xs text-rose-400 ${
                errors.phoneNumber ? 'visible' : 'invisible'
              }`}
            >
              {t('user-phone-number-input-error')}
            </p>
          </div>
          {/* User Address */}
          <div className='flex flex-col'>
            <label className='mb-2 dark:text-gray-300'>
              {t('user-address')}
            </label>
            <textarea
              {...register('address', { required: true, minLength: 5 })}
              className='resize-none rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              rows={1}
            />
            {/* description error message */}
            <p
              className={`text-xs text-rose-400 ${
                errors.address ? 'visible' : 'invisible'
              }`}
            >
              {t('user-address-input-error')}
            </p>
          </div>
        </div>
      </div>

      {/* schedule delivery */}
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <h3 className='text-md font-semibold text-gray-900 dark:text-white'>
            {t('schedule-delivery')}
          </h3>
        </div>

        <div className='ms-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 dark:bg-gray-800'>
          {/* delivery details */}
          {/* Delivery Date */}
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('delivery-date')}
              </label>
              <DataPickerInput />
            </div>
            {/* Note */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>{t('note')}</label>
              <input
                type='text'
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
            </div>
          </div>
        </div>
      </div>

      {/* payment method */}
      <div className='space-y-4'>
        <h3 className='text-md font-semibold text-gray-900 dark:text-white'>
          {t('payment-method')}
        </h3>

        <div className='ms-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 dark:bg-gray-800 sm:grid-cols-3'>
          {/* payment method details */}
          {paymentMethodData?.map((method, index) => (
            <label
              className='relative flex cursor-pointer items-center justify-center gap-[1em] text-black'
              htmlFor={method?.id}
              key={method?.id}
            >
              <input
                className='peer appearance-none'
                id={method?.id}
                name='tick'
                type='checkbox'
                onChange={() => paymentMethodChange(index, method?.id)}
                checked={paymentMethodSelected === index}
              />
              <span className='absolute start-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-[0.25em] border-[2px] border-black'></span>
              <svg
                viewBox='0 0 69 89'
                className='absolute start-0 top-1/2 h-5 w-5 -translate-y-1/2 duration-500 ease-out [stroke-dasharray:100] [stroke-dashoffset:100] peer-checked:[stroke-dashoffset:0]'
                fill='none'
                height='89'
                width='69'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M.93 63.984c3.436.556 7.168.347 10.147 2.45 4.521 3.19 10.198 8.458 13.647 12.596 1.374 1.65 4.181 5.922 5.598 8.048.267.4-1.31.823-1.4.35-5.744-30.636 9.258-59.906 29.743-81.18C62.29 2.486 63.104 1 68.113 1'
                  strokeWidth='6px'
                  stroke='black'
                  pathLength='100'
                ></path>
              </svg>

              <p className='text-[1em] font-bold [user-select:none]'>
                {i18n.language === 'en' ? method?.nameEN : method?.nameFA}
              </p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
