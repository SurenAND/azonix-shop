import Layout from "@/src/components/layout/main-layout/Layout";
import ShopTemplate from "@/src/components/templates/shop/Shop";
import { ReactElement } from "react";

export default function Shop() {
  return <ShopTemplate />;
}

Shop.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
