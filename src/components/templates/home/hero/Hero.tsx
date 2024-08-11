import MyButton from "@/src/components/shared/button/Button";
import { HeroData } from "@/src/components/templates/home/hero/data";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
const Hero = () => {
  const { t, i18n } = useTranslation();
  const setting = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 800,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    pauseOnHover: false,
    pauseOnFocus: true,
  };

  return (
    <div className="container">
      <div
        className={`overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] flex justify-center items-center ${
          i18n.dir() === "ltr" ? "hero-bg-color-ltr" : "hero-bg-color-rtl"
        }`}
      >
        <div className="container pb-8 sm:pb-0">
          {/* Hero section */}
          <Slider {...setting}>
            {HeroData.map((data) => (
              <div key={data.id} dir={i18n.dir()}>
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* text content section */}
                  <div className="flex flex-col justify-center gap-4 sm:ps-3 pt-12 sm:pt-0 text-center sm:text-start order-2 sm:order-1 relative z-10">
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-2xl sm:text-6xl lg:text-2xl font-bold"
                    >
                      {i18n.dir() === "ltr" ? data.subtitleEN : data.subtitleFA}
                    </h1>
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl sm:text-6xl lg:text-7xl font-bold"
                    >
                      {i18n.dir() === "ltr" ? data.titleEN : data.titleFA}
                    </h1>
                    <h1
                      data-aos="zoom-out"
                      data-aos-duration="500"
                      data-aos-once="true"
                      className="text-5xl uppercase text-white dark:text-white/5 sm:text-[80px] md:text-[100px] xl:text-[150px] font-bold"
                    >
                      {i18n.dir() === "ltr" ? data.title2EN : data.title2FA}
                    </h1>
                    <div
                      data-aos="fade-up"
                      data-aos-offset="0"
                      data-aos-duration="500"
                      data-aos-delay="300"
                    >
                      <MyButton
                        text={t("shop-now")}
                        bgColor="bg-primary"
                        textColor="text-white"
                      />
                    </div>
                  </div>
                  {/* image section */}
                  <div className="order-1 sm:order-2">
                    <div
                      data-aos="zoom-in"
                      data-aos-once="true"
                      className="relative z-10"
                    >
                      <Image
                        src={data.img}
                        alt={data.title2EN}
                        className={`w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] object-contain mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] relative z-40 ${
                          i18n.dir() === "rtl"
                            ? "[transform:rotateY(180deg)]"
                            : ""
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
