import PaymentFaSkeleton from '@/src/components/shared/skeletons/paymentfa-skeleton/PaymentFaSkeleton';
import { lazy, Suspense } from 'react';

const PaymentForm = lazy(
  () => import('@/src/components/templates/payment/fa/PaymentForm'),
);

const PaymentFa = () => {
  return (
    <Suspense fallback={<PaymentFaSkeleton />}>
      <PaymentForm />
    </Suspense>
  );
};

export default PaymentFa;
