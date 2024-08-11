import paymentSuccess from '@/src/assets/images/result/paymentSuccess.png';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const SuccessfulPurchase = () => {
  // libraries
  const { t } = useTranslation();

  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-axGray px-8 dark:bg-gray-700'>
      <Image
        src={paymentSuccess}
        alt='پرداخت موفقیت آمیز'
        className='mx-auto max-w-[10rem] mix-blend-multiply'
        width={160}
        height={160}
      />
      <p className='text-center text-base leading-7'>
        {t('payment-result-successful')}
      </p>
    </div>
  );
};

export default SuccessfulPurchase;
