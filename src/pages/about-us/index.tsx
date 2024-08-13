import Layout from '@/src/components/layout/main-layout/Layout';
import AboutUsTemplate from '@/src/components/templates/about-us/AboutUs';
import { ReactElement } from 'react';

export default function AboutUs() {
  return <AboutUsTemplate />;
}

AboutUs.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
