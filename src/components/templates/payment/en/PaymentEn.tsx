import LoadingPage from '@/src/components/shared/loading-page/LoadingPage';
import dynamic from 'next/dynamic';

const CreditCardForm = dynamic(
  () => import('@/src/components/templates/payment/en/CreditCardForm'),
  {
    loading: () => <LoadingPage />,
  },
);

const PaymentEn = () => {
  return <CreditCardForm />;
};

export default PaymentEn;
