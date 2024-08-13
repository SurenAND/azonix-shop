import Layout from '@/src/components/layout/main-layout/Layout';
import WishlistTemplate from '@/src/components/templates/wishlist/Wishlist';
import { ReactElement } from 'react';

export default function Wishlist() {
  return <WishlistTemplate />;
}

Wishlist.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
