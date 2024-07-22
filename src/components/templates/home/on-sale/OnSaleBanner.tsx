import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";
type OnSaleBannerProps = {
  data: {
    discountEN: string;
    discountFA: string;
    titleEN: string;
    titleFA: string;
    dateEN: string;
    dateFA: string;
    image: StaticImageData;
    title2EN: string;
    title2FA: string;
    title3EN: string;
    title3FA: string;
    title4EN: string;
    title4FA: string;
    bgColor: string;
  };
};

const OnSaleBanner = ({ data }: OnSaleBannerProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-[550px] flex justify-center items-center py-12">
      <div className="container">
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-white rounded-3xl"
          style={{ backgroundColor: data.bgColor }}
        >
          {/* first col */}
          <div className="p-6 sm:p-8 flex flex-col justify-center gap-4">
            <p className="text-sm">
              {i18n.dir() === "ltr" ? data.discountEN : data.discountFA}
            </p>
            <h1 className="uppercase text-4xl lg:text-7xl font-bold">
              {i18n.dir() === "ltr" ? data.titleEN : data.titleFA}
            </h1>
            <p className="text-sm">
              {i18n.dir() === "ltr" ? data.dateEN : data.dateFA}
            </p>
          </div>

          {/* second col */}
          <div className="h-full flex items-center">
            <Image
              src={data.image}
              alt="on sale"
              className="scale-125 w-[250px] md:w-[340px] mx-auto drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] object-cover"
            />
          </div>

          {/* third col */}
          <div className="flex flex-col justify-center gap-4 p-6 sm:p-8">
            <p className="font-bold text-xl">
              {i18n.dir() === "ltr" ? data.title2EN : data.title2FA}
            </p>
            <p className="text-3xl sm:text-5xl font-bold">
              {i18n.dir() === "ltr" ? data.title3EN : data.title3FA}
            </p>
            <p className="text-sm tracking-wide leading-5">
              {i18n.dir() === "ltr" ? data.title4EN : data.title4FA}
            </p>
            <div>
              <button
                className="bg-white px-4 py-2 rounded-full"
                style={{ color: data.bgColor }}
              >
                {t("shop-now")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSaleBanner;
