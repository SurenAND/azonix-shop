import paymentFailure from '@/src/assets/images/result/paymentFailure.png';
import { MainRoutes } from '@/src/constant/routes';
import { useTranslation } from 'react-i18next';
const FailedPurchase = () => {
  const { t } = useTranslation();
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-axGray px-8'>
      <img
        src={paymentFailure.src}
        alt='عدم موفقیت در پرداخت'
        className='mx-auto max-w-[5rem]'
      />
      <p className='text-center text-base leading-7'>
        {t('payment-result-failed')}
      </p>
      <button
        type='submit'
        className='flex items-center justify-center rounded-lg bg-primary px-10 py-5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4  focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary'
        onClick={() => {
          location.href = MainRoutes.PAYMENT;
        }}
      >
        {t('back-to-payment-gateway')}
      </button>
    </div>
  );
};

export default FailedPurchase;
