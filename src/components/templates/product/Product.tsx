import { useGetProductById } from '@/src/api/product/product.queries';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast, Toaster } from 'sonner';

type ProductTemplateProps = {
  productId: string;
};

const ProductTemplate = ({ productId }: ProductTemplateProps) => {
  const { t } = useTranslation();
  const { push: pushRouter } = useRouter();
  const { data: product } = useGetProductById(productId);
  const [activeImg, setActiveImage] = useState('');
  const [amount, setAmount] = useState(1);

  const { setShoppingCartInfo } = useCheckoutStore();
  const { state } = useUserContext();

  useEffect(() => {
    if (product) {
      setActiveImage(product?.data.product.images[0]);
    }
  }, [product]);

  const addToCardHandler = () => {
    if (product) {
      setShoppingCartInfo({
        _id: product?.data.product._id,
        userId: state.userId,
        name: product?.data.product.name,
        image: product?.data.product.images[0],
        price: product?.data.product.price,
        priceAfterDiscount: product?.data.product.priceAfterDiscount,
        quantity: amount,
      });
    }
  };

  if (product && product?.status !== 'success') {
    pushRouter(MainRoutes.NOTFOUND);
  }

  return (
    <>
      <Toaster richColors />
      <div className='flex flex-col justify-between gap-16 p-14 lg:flex-row lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-2/4'>
          <img
            src={`http://${activeImg}`}
            alt={product?.data.product.name}
            className='aspect-square h-full w-full rounded-xl border border-gray-400 object-cover dark:border-gray-200'
          />
          <div className='flex h-24 flex-row justify-between'>
            {product?.data.product.images.map((image) => (
              <Image
                src={`http://${image}`}
                alt={product?.data.product.name}
                width={100}
                height={100}
                className='cursor-pointer rounded-md border border-gray-400 object-cover dark:border-gray-200'
                onClick={() => setActiveImage(image)}
              />
            ))}
          </div>
        </div>
        {/* ABOUT */}
        <div className='flex flex-col items-center gap-10 self-start text-center md:items-start md:text-start lg:w-2/4'>
          {/* category and name */}
          <div className='mt-5 flex flex-col'>
            <div className='flex flex-row gap-2'>
              <span
                className='cursor-pointer font-semibold text-violet-600'
                onClick={() => pushRouter(MainRoutes.SHOP)}
              >
                {t('shop')} /
              </span>
              <span
                className='cursor-pointer font-semibold text-violet-600'
                onClick={() =>
                  pushRouter(
                    `${MainRoutes.SHOP}/${product?.data.product.category.slugname}`,
                  )
                }
              >
                {product?.data.product.category.name} /
              </span>
              <span className='font-semibold text-violet-600'>
                {product?.data.product.subcategory.name}
              </span>
            </div>
            <h1 className='text-3xl font-bold'>{product?.data.product.name}</h1>
          </div>
          {/* description */}
          <div className='text-gray-700 dark:text-gray-400 lg:min-h-72'>
            {product && parse(product?.data.product.description)}
          </div>
          {/* price */}
          <div className='flex items-center gap-5'>
            {/* after discount price */}
            <span className='text-3xl font-bold'>
              ${product?.data.product.priceAfterDiscount.toFixed(2)}
            </span>
            {/* before discount price */}
            <div className='mt-1 flex items-center gap-2'>
              <span className='text-md line-through opacity-50'>
                ${product?.data.product.price}
              </span>
              <span className='rounded-md bg-axGreen px-1.5 py-0.5 text-sm text-white'>
                {t('discount-save')} {product?.data.product.discountPercentage}%
              </span>
            </div>
          </div>
          {/* amount and add to cart */}
          <div className='flex flex-col items-center gap-10 md:flex-row md:gap-12'>
            <div className='flex flex-row items-center'>
              {/* amount */}
              <button
                className='rounded-lg bg-gray-200 px-5 py-2 text-3xl text-axDarkPurple disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => setAmount((prev) => prev - 1)}
                disabled={amount === 1}
              >
                -
              </button>
              <span className='rounded-lg px-6 py-4'>{amount}</span>
              <button
                className='rounded-lg bg-gray-200 px-4 py-2 text-3xl text-axDarkPurple disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => setAmount((prev) => prev + 1)}
                disabled={amount === product?.data.product.quantity}
              >
                +
              </button>
            </div>
            {/* add to cart */}
            <div className='relative flex flex-col items-center gap-2'>
              {/* add to cart button */}
              <button
                className='h-full rounded-xl bg-axDarkPurple px-16 py-3 font-semibold text-white hover:bg-axDarkPurple/80 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={product?.data.product.quantity === 0}
                onClick={addToCardHandler}
              >
                {t('add-to-cart')}
              </button>
              {/* stock */}
              {product?.data.product.quantity &&
                product?.data.product.quantity < 10 && (
                  <span className='absolute top-14 text-sm text-red-500'>
                    {t('stock', {
                      amount: product?.data.product.quantity,
                    })}
                  </span>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTemplate;
