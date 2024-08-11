import { useGetProductById } from '@/src/api/product/product.queries';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { ShoppingCartItem } from '@/src/store/checkout/checkout.type';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type CartCardProps = {
  product: ShoppingCartItem;
  setOutOfStock: Dispatch<SetStateAction<boolean>>;
  outOfStock: boolean;
};

const CartCard = ({ product, setOutOfStock, outOfStock }: CartCardProps) => {
  // libraries
  const { t } = useTranslation();

  // store
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCheckoutStore();

  // queries
  const { data: productInDB } = useGetProductById(product?._id);

  // check if product is out of stock
  useEffect(() => {
    if (productInDB?.data.product.quantity === 0) {
      setOutOfStock(true);
    }
  }, [productInDB, setOutOfStock]);

  // function
  const handleRemoveFromCart = () => {
    removeFromCart(product?.userId, product?._id);
    if (outOfStock) {
      location.reload();
    }
  };

  return (
    <div>
      <div className='flex flex-col items-center justify-between rounded-lg bg-white p-2 shadow-lg sm:flex-row'>
        {/* Product Image */}
        <Image
          className='m-2 rounded-md border bg-gray-200 object-cover object-center'
          src={`http://${product?.image}`}
          alt={product?.name || 'Product image'}
          width={112}
          height={112}
        />
        {/* Product Info */}
        <div className='flex w-full flex-col px-4 py-4'>
          <span className='font-semibold'>{product?.name}</span>
          <span className='float-right text-gray-400 line-through'>
            {product?.price.toFixed(2)}
            {t('currency')}
          </span>
          <p className='text-lg font-bold'>
            {product?.priceAfterDiscount.toFixed(2)}
            {t('currency')}
          </p>
        </div>
        {/* Quantity */}
        <div className='flex flex-col items-end gap-8'>
          {productInDB?.data.product.quantity === 0 ? (
            <span className='text-nowrap text-sm text-red-500'>
              {t('out-of-stock')}
            </span>
          ) : (
            <div className='mx-auto flex h-8 text-gray-600'>
              <button
                type='button'
                onClick={() => decrementQuantity(product?.userId, product?._id)}
                className='flex items-center justify-center rounded-s-md bg-axLightPurple/80 px-4 text-white transition hover:bg-axDarkPurple disabled:cursor-not-allowed disabled:opacity-30'
                disabled={product?.quantity === 1}
              >
                -
              </button>
              <div className='flex w-full items-center justify-center bg-gray-100 px-4 text-xs transition'>
                {product?.quantity}
              </div>
              <button
                type='button'
                onClick={() => incrementQuantity(product?.userId, product?._id)}
                className='flex items-center justify-center rounded-e-md bg-axLightPurple/80 px-4 text-white transition hover:bg-axDarkPurple disabled:cursor-not-allowed disabled:opacity-30'
                disabled={
                  product?.quantity === productInDB?.data.product.quantity
                }
              >
                +
              </button>
            </div>
          )}
          <span
            onClick={handleRemoveFromCart}
            className='cursor-pointer text-xs text-gray-400 underline transition hover:text-axDarkPurple'
          >
            {t('remove')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
