import { ProductType } from '@/src/api/product/product.type';
import HalfStar from '@/src/assets/images/rating/star-half-fill.svg';
import EmptyStar from '@/src/assets/images/rating/star-no-fill.svg';
import FullStar from '@/src/assets/images/rating/star.svg';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import useWishlistStore from '@/src/store/wishlist/wishlist.store';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaEye, FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';

type ProductCardPropsType = {
  product: ProductType;
  index: number;
};

const ProductCard = ({ product, index }: ProductCardPropsType) => {
  // libraries
  const { t, i18n } = useTranslation();
  const { push: pushRouter } = useRouter();

  // contexts & stores
  const { state } = useUserContext();
  const { setShoppingCartInfo } = useCheckoutStore();
  const { changeWishlist } = useWishlistStore();

  // functions
  const addToCardHandler = () => {
    if (product) {
      setShoppingCartInfo({
        _id: product?._id,
        userId: state.userId,
        name: product?.name,
        image: product?.images[0],
        price: product?.price,
        priceAfterDiscount: product?.priceAfterDiscount,
        quantity: 1,
      });
      toast.success(t('product-added-to-cart'));
    }
  };

  const addToWishlistHandler = () => {
    if (product) {
      changeWishlist({
        _id: product?._id,
        userId: state.userId,
        name: product?.name,
        image: product?.images[0],
        brand: product?.brand,
        category: product?.category.slugname,
      });
      toast.success(t('wishlist-changed'));
    }
  };

  return (
    <div
      key={product?._id}
      className='min-h-[10rem] w-72 overflow-hidden rounded-md bg-white text-gray-700 shadow-lg'
    >
      {/* product image */}
      <div
        className={`relative flex h-[180px] w-full items-center justify-center ${
          index % 2 === 0 ? 'bg-axYellow/80' : 'bg-primary/80'
        }  ${product?.quantity === 0 ? 'opacity-50' : ''}`}
      >
        <Image
          src={`http://${product?.images[0]}`}
          alt={product?.name}
          width={150}
          height={150}
          className='drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]'
        />
        {product?.quantity === 0 && (
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black/50'>
            <p className='text-center text-2xl font-bold text-axGray'>
              {t('out-of-stock')}
            </p>
          </div>
        )}
      </div>

      {/* product info */}
      <div className='flex flex-col gap-3 p-5'>
        {/* brand */}
        <div className='flex items-center gap-2'>
          <span className='rounded-full bg-gray-100 px-3 py-1 text-xs'>
            {product?.brand}
          </span>
        </div>

        {/* product title */}
        <h2
          className='overflow-hidden overflow-ellipsis whitespace-nowrap text-2xl font-semibold'
          title={product?.name}
        >
          {product?.name}
        </h2>

        {/* product price */}
        <div>
          {/* after discount price */}
          <span className='text-xl font-bold'>
            ${product?.priceAfterDiscount.toFixed(2)}
          </span>
          {/* before discount price */}
          <div className='mt-1 flex items-center gap-2'>
            <span className='text-sm line-through opacity-50'>
              ${product?.price}
            </span>
            <span className='rounded-md bg-axGreen px-1.5 py-0.5 text-xs text-white'>
              {t('discount-save')} {product?.discountPercentage}%
            </span>
          </div>
        </div>

        {/* product rating */}
        <div className='mt-1 flex items-center'>
          <Image
            src={FullStar}
            alt='full star'
            className='h-[1.2rem] w-[1.2rem]'
          />
          <Image
            src={FullStar}
            alt='full star'
            className='h-[1.2rem] w-[1.2rem]'
          />
          <Image
            src={FullStar}
            alt='full star'
            className='h-[1.2rem] w-[1.2rem]'
          />
          <Image
            src={HalfStar}
            alt='half star'
            className='h-[1.2rem] w-[1.2rem]'
          />
          <Image
            src={EmptyStar}
            alt='empty star'
            className='h-[1.2rem] w-[1.2rem]'
          />
          <span className='ms-2 text-xs text-gray-500'>20{t('k-reviews')}</span>
        </div>

        {/* product action button */}
        <div className='mt-5 flex gap-2'>
          {/* add to cart button */}
          <button
            onClick={addToCardHandler}
            className={`rounded-md px-6 py-2 font-medium text-white transition disabled:cursor-not-allowed ${
              i18n.dir() === 'ltr' ? 'tracking-wider' : ''
            } ${
              index % 2 === 0
                ? 'bg-axYellow/80 hover:bg-axYellow/90'
                : 'bg-primary/80 hover:bg-primary/90'
            }`}
            disabled={product?.quantity === 0}
          >
            {t('add-to-cart')}
          </button>
          {/* wishlist button */}
          <button
            onClick={addToWishlistHandler}
            className='flex flex-grow items-center justify-center rounded-md bg-gray-300/60 transition hover:bg-gray-300/80'
          >
            <FaHeart className='opacity-50' />
          </button>
          {/* view button */}
          <button
            className='flex flex-grow items-center justify-center rounded-md bg-gray-300/60 transition hover:bg-gray-300/80'
            onClick={() => {
              pushRouter(
                `${MainRoutes.SHOP}/${product?.category.slugname}/${product?._id}`,
              );
            }}
          >
            <FaEye className='opacity-50' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
