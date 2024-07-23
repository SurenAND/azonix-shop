import BestSellerProducts from "@/src/components/templates/home/best-seller/BestSellerProducts";
import Categories from "@/src/components/templates/home/categories/Categories";
import Hero from "@/src/components/templates/home/hero/Hero";
import OnSaleBanner from "@/src/components/templates/home/on-sale/OnSaleBanner";
import Partners from "@/src/components/templates/home/partners/Partners";
import RecentNews from "@/src/components/templates/home/recent-news/RecentNews";
import Services from "@/src/components/templates/home/services/Services";
import { firstBannerData, secondBannerData } from "@/src/constant/bannerData";
import { useEffect, useState } from "react";

export default function HomeTemplate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isClient && (
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
      )}
    </div>
  );
}
