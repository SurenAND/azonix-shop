import { ProductType } from "@/src/api/product/product.type";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { FaEye, FaHeart } from "react-icons/fa";

// rating image import
import HalfStar from "@/src/assets/images/rating/star-half-fill.svg";
import EmptyStar from "@/src/assets/images/rating/star-no-fill.svg";
import FullStar from "@/src/assets/images/rating/star.svg";

type ProductCardPropsType = {
  product: ProductType;
  index: number;
};

const ProductCard = ({ product, index }: ProductCardPropsType) => {
  const { i18n } = useTranslation();
  return (
    <div
      key={product._id}
      className="bg-white text-gray-700 w-72 min-h-[10rem] shadow-lg rounded-md overflow-hidden"
    >
      <div
        className={`w-full h-[180px] flex items-center justify-center ${
          index % 2 === 0 ? "bg-axYellow/80" : "bg-primary/80"
        }`}
      >
        <Image
          src={`http://${product.images[0]}`}
          alt={product.name}
          width={150}
          height={150}
          className="drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]"
        />
      </div>
      <div className="flex flex-col p-5 gap-3">
        {/* brand */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs bg-gray-100">
            {product.brand}
          </span>
        </div>

        {/* product title */}
        <h2
          className="font-semibold text-2xl overflow-ellipsis overflow-hidden whitespace-nowrap"
          title={product.name}
        >
          {product.name}
        </h2>

        {/* product price */}
        <div>
          {/* after discount price */}
          <span className="text-xl font-bold">
            $
            {(
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2)}
          </span>
          {/* before discount price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm line-through opacity-50">
              ${product.price}
            </span>
            <span className="bg-axGreen px-1.5 py-0.5 rounded-md text-xs text-white">
              save {product.discountPercentage}%
            </span>
          </div>
        </div>

        {/* product rating */}
        <div className="flex items-center mt-1">
          <Image
            src={FullStar}
            alt="full star"
            className="w-[1.2rem] h-[1.2rem]"
          />
          <Image
            src={FullStar}
            alt="full star"
            className="w-[1.2rem] h-[1.2rem]"
          />
          <Image
            src={FullStar}
            alt="full star"
            className="w-[1.2rem] h-[1.2rem]"
          />
          <Image
            src={HalfStar}
            alt="half star"
            className="w-[1.2rem] h-[1.2rem]"
          />
          <Image
            src={EmptyStar}
            alt="empty star"
            className="w-[1.2rem] h-[1.2rem]"
          />
          <span className="text-xs ms-2 text-gray-500">20k reviews</span>
        </div>

        {/* product action button */}
        <div className="mt-5 flex gap-2">
          {/* add to cart button */}
          <button
            className={`px-6 py-2 rounded-md text-white font-medium transition ${
              i18n.dir() === "ltr" ? "tracking-wider" : ""
            } ${
              index % 2 === 0
                ? "bg-axYellow/80 hover:bg-axYellow/90"
                : "bg-primary/80 hover:bg-primary/90"
            }`}
          >
            Add to cart
          </button>
          {/* wishlist button */}
          <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 rounded-md transition">
            <FaHeart className="opacity-50" />
          </button>
          {/* view button */}
          <button className="flex-grow flex justify-center items-center bg-gray-300/60 hover:bg-gray-300/80 rounded-md transition">
            <FaEye className="opacity-50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
