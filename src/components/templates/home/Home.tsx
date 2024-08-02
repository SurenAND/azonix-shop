import Loading from '@/src/components/shared/loading/Loading';
import { firstBannerData, secondBannerData } from '@/src/constant/bannerData';
import { lazy, Suspense, useEffect, useState } from 'react';

const Hero = lazy(() => import('@/src/components/templates/home/hero/Hero'));
const Categories = lazy(
  () => import('@/src/components/templates/home/categories/Categories'),
);
const Services = lazy(
  () => import('@/src/components/templates/home/services/Services'),
);
const OnSaleBanner = lazy(
  () => import('@/src/components/templates/home/on-sale/OnSaleBanner'),
);
const BestSellerProducts = lazy(
  () =>
    import('@/src/components/templates/home/best-seller/BestSellerProducts'),
);
const RecentNews = lazy(
  () => import('@/src/components/templates/home/recent-news/RecentNews'),
);
const Partners = lazy(
  () => import('@/src/components/templates/home/partners/Partners'),
);

export default function HomeTemplate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {isClient && (
        <Suspense fallback={<Loading />}>
          <Hero />
          <Categories />
          <Services />
          <OnSaleBanner data={firstBannerData} />
          <BestSellerProducts />
          <OnSaleBanner data={secondBannerData} />
          <RecentNews />
          <Partners />
        </Suspense>
      )}
    </div>
  );
}
