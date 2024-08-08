import Layout from '@/src/components/layout/main-layout/Layout';
import PaymentResultTemplate from '@/src/components/templates/payment-result/PaymentResult';
import { ReactElement } from 'react';

export default function PaymentResult() {
  return <PaymentResultTemplate />;
}

PaymentResult.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
