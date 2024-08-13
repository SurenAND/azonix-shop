import Layout from '@/src/components/layout/main-layout/Layout';
import CartTemplate from '@/src/components/templates/cart/Cart';
import { ReactElement } from 'react';

export default function Cart() {
  return <CartTemplate />;
}

Cart.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
