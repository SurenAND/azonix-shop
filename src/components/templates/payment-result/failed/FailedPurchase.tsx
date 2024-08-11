import paymentFailure from '@/src/assets/images/result/paymentFailure.png';
import { MainRoutes } from '@/src/constant/routes';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const FailedPurchase = () => {
  // libraries
  const { t, i18n } = useTranslation();

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-axGray px-8 dark:bg-gray-700'>
      <Image
        src={paymentFailure}
        alt={t('payment-failure-alt')}
        className='mx-auto'
        width={80}
        height={80}
      />
      <p className='text-center text-base leading-7'>
        {t('payment-result-failed')}
      </p>
      <button
        type='submit'
        className='flex items-center justify-center rounded-lg bg-primary px-10 py-5 text-sm font-medium text-white hover:bg-primary focus:outline-none focus:ring-4  focus:ring-primary dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary'
        onClick={() => {
          location.href =
            i18n.language === 'fa'
              ? MainRoutes.PAYMENT_FA
              : MainRoutes.PAYMENT_EN;
        }}
      >
        {t('back-to-payment-gateway')}
      </button>
    </div>
  );
};

export default FailedPurchase;
