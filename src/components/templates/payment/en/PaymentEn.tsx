import LoadingPage from '@/src/components/shared/loading-page/LoadingPage';
import { lazy, Suspense } from 'react';

const CreditCardForm = lazy(
  () => import('@/src/components/templates/payment/en/CreditCardForm'),
);

const PaymentEn = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <CreditCardForm />
    </Suspense>
  );
};

export default PaymentEn;
