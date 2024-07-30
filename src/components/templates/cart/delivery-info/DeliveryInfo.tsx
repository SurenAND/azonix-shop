import { UserByIdType } from '@/src/api/auth/auth.type';
import DataPickerInput from '@/src/components/shared/date-picker-input/DataPickerInput';
import { paymentMethodData } from '@/src/constant/paymentMethodData';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type DeliveryInfoPropsType = {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  setDeliveryDate: Dispatch<SetStateAction<string | undefined>>;
  paymentMethodSelected: number | null;
  setPaymentName: Dispatch<SetStateAction<string>>;
  setPaymentMethodSelected: Dispatch<SetStateAction<number | null>>;
  oldUser: UserByIdType | undefined;
  reset: UseFormReset<FieldValues>;
};

const DeliveryInfo = ({
  register,
  errors,
  setDeliveryDate,
  setPaymentName,
  setPaymentMethodSelected,
  paymentMethodSelected,
  oldUser,
  reset,
}: DeliveryInfoPropsType) => {
  const [scheduleDelivery, setScheduleDelivery] = useState(false);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (oldUser) {
      reset({
        firstname: oldUser?.data?.user?.firstname || '',
        lastname: oldUser?.data?.user?.lastname || '',
        username: oldUser?.data?.user?.username || '',
        phoneNumber: oldUser?.data?.user?.phoneNumber || '',
        address: oldUser?.data?.user?.address || '',
      });
    }
  }, [oldUser, reset]);

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
          <label className='relative inline-block h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-700'>
            <input
              className='peer sr-only'
              id='AcceptConditions'
              type='checkbox'
              onChange={() => setScheduleDelivery(!scheduleDelivery)}
            />
            <span className='absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent'></span>
          </label>
        </div>

        <div
          className={`ms-2 grid-cols-1 gap-4 rounded-lg bg-white p-5 dark:bg-gray-800 ${
            scheduleDelivery ? 'grid' : 'hidden'
          }`}
        >
          {/* delivery details */}
          {/* Delivery Date */}
          <div className='flex flex-col gap-5'>
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('delivery-date')}
              </label>
              <DataPickerInput setDeliveryDate={setDeliveryDate} />
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
          {paymentMethodData.map((method, index) => (
            <label
              className='relative flex cursor-pointer items-center justify-center gap-[1em] text-black'
              htmlFor={method.id}
              key={method.id}
            >
              <input
                className='peer appearance-none'
                id={method.id}
                name='tick'
                type='checkbox'
                onChange={() => paymentMethodChange(index, method.id)}
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
                {i18n.language === 'en' ? method.nameEN : method.nameFA}
              </p>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfo;
