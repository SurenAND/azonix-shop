import HalfStar from '@/src/assets/images/rating/star-half-fill.svg';
import EmptyStar from '@/src/assets/images/rating/star-no-fill.svg';
import FullStar from '@/src/assets/images/rating/star.svg';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useWishlistStore from '@/src/store/wishlist/wishlist.store';
import { WishlistItem } from '@/src/store/wishlist/wishlist.type';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { FaEye } from 'react-icons/fa';
import { TbTrashXFilled } from 'react-icons/tb';
import { toast } from 'sonner';

type WishlistCardPropsType = {
  product: WishlistItem;
  index: number;
};

const WishlistCard = ({ product, index }: WishlistCardPropsType) => {
  // libraries
  const { t } = useTranslation();
  const { push: pushRouter } = useRouter();

  // contexts & stores
  const { state } = useUserContext();
  const { removeFromWishlist } = useWishlistStore();

  // functions
  const removeFromWishlistHandler = () => {
    removeFromWishlist(state.userId, product?._id);
    toast.success(t('wishlist-changed'));
  };

  return (
    <div
      key={product?._id}
      className='min-h-[10rem] w-72 overflow-hidden rounded-md bg-white text-gray-700 shadow-lg'
    >
      {/* product image */}
      <div
        className={`group relative flex h-[180px] w-full items-center justify-center ${
          index % 2 === 0 ? 'bg-axYellow/80' : 'bg-primary/80'
        }`}
      >
        <Image
          src={product?.image}
          alt={product?.name}
          width={150}
          height={150}
          className='drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)]'
        />
        <div className='absolute right-0 top-0 flex h-full w-full items-center justify-evenly bg-black/50 opacity-0 group-hover:opacity-100'>
          <button
            className='flex h-14 w-14 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200'
            onClick={() => {
              pushRouter(
                `${MainRoutes.SHOP}/${product?.category}/${product?._id}`,
              );
            }}
          >
            <FaEye className='h-6 w-6' />
          </button>
          <button
            className='flex h-14 w-14 items-center justify-center rounded-full bg-white p-2 hover:bg-gray-200'
            onClick={removeFromWishlistHandler}
          >
            <TbTrashXFilled className='h-6 w-6' />
          </button>
        </div>
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
      </div>
    </div>
  );
};

export default WishlistCard;
