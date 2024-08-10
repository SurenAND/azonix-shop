import { firstBannerData, secondBannerData } from '@/src/constant/bannerData';
import dynamic from 'next/dynamic';

const Hero = dynamic(() => import('@/src/components/templates/home/hero/Hero'));
const Categories = dynamic(
  () => import('@/src/components/templates/home/categories/Categories'),
);
const Services = dynamic(
  () => import('@/src/components/templates/home/services/Services'),
);
const OnSaleBanner = dynamic(
  () => import('@/src/components/templates/home/on-sale/OnSaleBanner'),
);
const BestSellerProducts = dynamic(
  () =>
    import('@/src/components/templates/home/best-seller/BestSellerProducts'),
);
const RecentNews = dynamic(
  () => import('@/src/components/templates/home/recent-news/RecentNews'),
);
const Partners = dynamic(
  () => import('@/src/components/templates/home/partners/Partners'),
);

export default function HomeTemplate() {
  return (
    <>
      <Hero />
      <Categories />
      <Services />
      <OnSaleBanner data={firstBannerData} />
      <BestSellerProducts />
      <OnSaleBanner data={secondBannerData} />
      <RecentNews />
      <Partners />
    </>
  );
}
