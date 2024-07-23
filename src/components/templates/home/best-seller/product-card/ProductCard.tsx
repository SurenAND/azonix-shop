import MyButton from "@/src/components/shared/button/Button";
import Image, { StaticImageData } from "next/image";
import { useTranslation } from "react-i18next";

type ProductCardProps = {
  data: {
    id: number;
    img: StaticImageData;
    title: string;
    price: string;
    aosDelay: string;
  };
};

const ProductCard = ({ data }: ProductCardProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div data-aos="fade-up" data-aos-delay={data.aosDelay} className="group">
      <div className="relative">
        <Image
          src={data.img}
          alt={data.title}
          className="h-[180px] w-[260px] object-cover rounded-md"
        />
        {/* hover effect */}
        <div
          className={`hidden group-hover:flex absolute top-1/2 start-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 -translate-y-1/2 ${
            i18n.dir() === "ltr" ? "-translate-x-1/2" : "translate-x-1/2"
          }`}
        >
          <MyButton
            text={t("add-to-cart")}
            bgColor="bg-primary"
            textColor="text-white"
          />
        </div>
      </div>
      <div className="leading-7">
        <h2 className="font-semibold">{data.title}</h2>
        <p className="font-bold">${data.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
