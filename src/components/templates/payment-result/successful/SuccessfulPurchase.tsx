import paymentSuccess from '@/src/assets/images/result/paymentSuccess.png';
import { useTranslation } from 'react-i18next';

const SuccessfulPurchase = () => {
  const { t } = useTranslation();
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center gap-8 bg-axGray px-8'>
      <img
        src={paymentSuccess.src}
        alt='پرداخت موفقیت آمیز'
        className='mx-auto max-w-[10rem] mix-blend-multiply'
      />
      <p className='text-center text-base leading-7'>
        {t('payment-result-successful')}
      </p>
    </div>
  );
};

export default SuccessfulPurchase;
