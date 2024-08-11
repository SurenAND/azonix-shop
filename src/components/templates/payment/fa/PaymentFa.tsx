import PaymentFaSkeleton from '@/src/components/shared/skeletons/paymentfa-skeleton/PaymentFaSkeleton';
import dynamic from 'next/dynamic';

const PaymentForm = dynamic(
  () => import('@/src/components/templates/payment/fa/PaymentForm'),
  {
    loading: () => <PaymentFaSkeleton />,
  },
);

const PaymentFa = () => {
  return <PaymentForm />;
};

export default PaymentFa;
