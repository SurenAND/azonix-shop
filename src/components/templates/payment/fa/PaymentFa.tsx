import { lazy, Suspense } from 'react';

const PaymentForm = lazy(
  () => import('@/src/components/templates/payment/fa/PaymentForm'),
);

const PaymentFa = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentForm />
    </Suspense>
  );
};

export default PaymentFa;
