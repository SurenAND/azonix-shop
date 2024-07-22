import Categories from "@/src/components/templates/home/categories/Categories";
import Hero from "@/src/components/templates/home/hero/Hero";
import Services from "@/src/components/templates/home/services/Services";
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
        </>
      )}
    </div>
  );
}
