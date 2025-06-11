// import { useGetProductById } from '@/src/api/product/product.queries'; // Removed
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import { ShoppingCartItem } from '@/src/store/checkout/checkout.type';
import type { ProductType } from '@/src/api/product/product.type'; // Added
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type CartCardProps = {
  cartItem: ShoppingCartItem; // Renamed from product to cartItem
  fullProduct?: ProductType;  // Added: full product details from allProducts
  setOutOfStock: Dispatch<SetStateAction<boolean>>;
  outOfStock: boolean; // This prop seems problematic if CartCard instances independently set a shared state.
                       // Consider managing outOfStock state in Checkout.tsx based on all items.
};

const CartCard = ({ cartItem, fullProduct, setOutOfStock, outOfStock }: CartCardProps) => {
  // libraries
  const { t } = useTranslation();

  // store
  const { incrementQuantity, decrementQuantity, removeFromCart } =
    useCheckoutStore();

  // check if product is out of stock using fullProduct details
  useEffect(() => {
    // Set outOfStock for this item if its quantity in DB is 0
    // The parent (Checkout.tsx) should aggregate this to disable "Proceed" button
    if (fullProduct && fullProduct.quantity === 0) {
      // This might not work as intended if multiple CartCard instances call setOutOfStock.
      // It's better to check stock status directly when disabling the checkout button.
      // For now, this effect might just indicate for this specific card.
      setOutOfStock(true);
    } else if (fullProduct && fullProduct.quantity > 0 && outOfStock && cartItem.quantity <= fullProduct.quantity) {
      // If this item was previously out of stock but now isn't (or another item was),
      // this logic is insufficient to correctly reset the global outOfStock.
      // Let's simplify: parent Checkout will determine overall outOfStock.
      // This useEffect might be simplified or removed if setOutOfStock is for global state.
    }
  }, [fullProduct, setOutOfStock, outOfStock, cartItem.quantity]);

  // function
  const handleRemoveFromCart = () => {
    removeFromCart(cartItem?.userId, cartItem?._id);
    // The location.reload() on outOfStock seems like a heavy-handed way to refresh state.
    // This should ideally be reactive.
    // if (outOfStock) {
    //   location.reload();
    // }
  };

  const currentProductStock = fullProduct?.quantity ?? 0;
  const isItemOutOfStock = currentProductStock === 0;

  return (
    <div>
      <div className='flex flex-col items-center justify-between rounded-lg bg-white p-2 shadow-lg sm:flex-row'>
        {/* Product Image */}
        <Image
          className='m-2 rounded-md border bg-gray-200 object-cover object-center'
          src={`http://${cartItem?.image}`} // Image from cartItem
          alt={cartItem?.name || 'Product image'}
          width={112}
          height={112}
        />
        {/* Product Info */}
        <div className='flex w-full flex-col px-4 py-4'>
          <span className='font-semibold'>{cartItem?.name}</span> {/* Name from cartItem */}
          <span className='float-right text-gray-400 line-through'>
            {cartItem?.price.toFixed(2)} {/* Original price from cartItem */}
            {t('currency')}
          </span>
          <p className='text-lg font-bold'>
            {cartItem?.priceAfterDiscount.toFixed(2)} {/* Discounted price from cartItem */}
            {t('currency')}
          </p>
          {fullProduct && fullProduct.name !== cartItem.name && (
            <p className="text-xs text-gray-500">(Note: Details from general product list)</p>
          )}
        </div>
        {/* Quantity */}
        <div className='flex flex-col items-end gap-8'>
          {isItemOutOfStock ? (
            <span className='text-nowrap text-sm text-red-500'>
              {t('out-of-stock')}
            </span>
          ) : (
            <div className='mx-auto flex h-8 text-gray-600'>
              <button
                type='button'
                onClick={() => decrementQuantity(cartItem?.userId, cartItem?._id)}
                className='flex items-center justify-center rounded-s-md bg-axLightPurple/80 px-4 text-white transition hover:bg-axDarkPurple disabled:cursor-not-allowed disabled:opacity-30'
                disabled={cartItem?.quantity === 1}
              >
                -
              </button>
              <div className='flex w-full items-center justify-center bg-gray-100 px-4 text-xs transition'>
                {cartItem?.quantity} {/* Quantity from cartItem */}
              </div>
              <button
                type='button'
                onClick={() => incrementQuantity(cartItem?.userId, cartItem?._id)}
                className='flex items-center justify-center rounded-e-md bg-axLightPurple/80 px-4 text-white transition hover:bg-axDarkPurple disabled:cursor-not-allowed disabled:opacity-30'
                disabled={
                  cartItem?.quantity >= currentProductStock // Disable if cart quantity reaches actual stock
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
