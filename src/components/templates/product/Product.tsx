// import { useGetProductById } from '@/src/api/product/product.queries'; // Removed
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import parse from 'html-react-parser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';
import type { ProductType } from '@/src/api/product/product.type';
import type { CategoryType } from '@/src/api/category/category.type';
import ProductDetailSkeleton from '@/src/components/shared/skeletons/product-detail-skeleton/ProductDetailSkeleton';

export interface ProductTemplateProps {
  product: ProductType | null;
  categories: CategoryType[]; // For breadcrumbs or related categories, if needed
  isLoading: boolean;
  error?: string | null;
}

const ProductTemplate = ({ product, categories, isLoading, error }: ProductTemplateProps) => {
  // libraries
  const { t } = useTranslation();
  const { push: pushRouter } = useRouter();

  // states
  const [activeImg, setActiveImage] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);

  // Set active image when product data is available or changes
  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setActiveImage(product.images[0]);
    } else {
      setActiveImage(''); // Reset if no product or no images
    }
  }, [product]);

  // contexts & stores
  const { state: userAuthState } = useUserContext(); // Renamed to avoid conflict
  const { setShoppingCartInfo } = useCheckoutStore();

  // functions
  const addToCardHandler = () => {
    if (product) {
      setShoppingCartInfo({
        _id: product._id, // Assuming product ID is at root
        userId: userAuthState.userId,
        name: product.name,
        image: product.images[0],
        price: product.price,
        // Assuming priceAfterDiscount and discountPercentage are available on ProductType
        // If not, this part needs adjustment or data from API.
        priceAfterDiscount: product.priceAfterDiscount || product.price,
        quantity: amount,
      });
    }
  };

  const formatImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `http://${url.replace(/^\//, '')}`; // Basic formatting, ensure it matches your image source
  };

  if (isLoading) {
    return <ProductDetailSkeleton />; // Or a simpler "Loading product..."
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center p-8">Product not found.</div>;
  }

  // Assuming product.category is a CategoryType object or has enough info.
  // If product.category is just an ID, you'd find it in the `categories` prop.
  const productCategory = product.category as CategoryType; // Adjust if product.category is ID
  const productSubCategory = product.subcategory as CategoryType; // Adjust if product.subcategory is ID


  return (
    <>
      <Toaster richColors />
      <div className='flex flex-col justify-between gap-16 p-14 lg:flex-row lg:items-center'>
        <div className='flex flex-col gap-6 lg:w-2/4'>
          {activeImg && (
            <Image
              src={formatImageUrl(activeImg)}
              alt={product.name || ''}
              width={500}
              height={500}
              className='aspect-square h-full w-full rounded-xl border border-gray-400 object-cover dark:border-gray-200'
            />
          )}
          {product.images && product.images.length > 0 && (
            <div className='flex h-24 flex-row justify-start gap-2'> {/* Changed justify-between to justify-start and added gap */}
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={formatImageUrl(image)}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className='cursor-pointer rounded-md border border-gray-400 object-cover dark:border-gray-200'
                  onClick={() => setActiveImage(image)}
                />
              ))}
            </div>
          )}
        </div>
        {/* ABOUT */}
        <div className='flex flex-col items-center gap-10 self-start text-center md:items-start md:text-start lg:w-2/4'>
          <div className='mt-5 flex flex-col'>
            <div className='flex flex-row gap-2'>
              <span
                className='cursor-pointer font-semibold text-violet-600'
                onClick={() => pushRouter(MainRoutes.SHOP)}
              >
                {t('shop')} /
              </span>
              {productCategory?.slugname && (
                <span
                  className='cursor-pointer font-semibold text-violet-600'
                  onClick={() =>
                    pushRouter(
                      `${MainRoutes.SHOP}/${productCategory.slugname}`,
                    )
                  }
                >
                  {productCategory.name} /
                </span>
              )}
              {productSubCategory?.name && ( // Check if subcategory exists and has a name
                 <span className='font-semibold text-violet-600'>
                   {productSubCategory.name}
                 </span>
              )}
            </div>
            <h1 className='text-3xl font-bold'>{product.name}</h1>
          </div>
          <div className='text-gray-700 dark:text-gray-400 lg:min-h-72'>
            {product.description ? parse(product.description) : 'No description available.'}
          </div>
          <div className='flex items-center gap-5'>
            <span className='text-3xl font-bold'>
              ${(product.priceAfterDiscount || product.price).toFixed(2)}
            </span>
            {product.priceAfterDiscount && product.price > product.priceAfterDiscount && (
              <div className='mt-1 flex items-center gap-2'>
                <span className='text-md line-through opacity-50'>
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage && (
                  <span className='rounded-md bg-axGreen px-1.5 py-0.5 text-sm text-white'>
                    {t('discount-save')} {product.discountPercentage}%
                  </span>
                )}
              </div>
            )}
          </div>
          <div className='flex flex-col items-center gap-10 md:flex-row md:gap-12'>
            <div className='flex flex-row items-center'>
              <button
                className='rounded-lg bg-gray-200 px-5 py-2 text-3xl text-axDarkPurple disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => setAmount((prev) => Math.max(1, prev - 1))}
                disabled={amount === 1}
              >
                -
              </button>
              <span className='rounded-lg px-6 py-4'>
                {product.quantity === 0 ? '-' : amount}
              </span>
              <button
                className='rounded-lg bg-gray-200 px-4 py-2 text-3xl text-axDarkPurple disabled:cursor-not-allowed disabled:opacity-50'
                onClick={() => setAmount((prev) => prev + 1)}
                disabled={
                  amount >= product.quantity || product.quantity === 0
                }
              >
                +
              </button>
            </div>
            <div className='relative flex flex-col items-center gap-2'>
              <button
                className='h-full rounded-xl bg-axDarkPurple px-16 py-3 font-semibold text-white hover:bg-axDarkPurple/80 disabled:cursor-not-allowed disabled:opacity-50'
                disabled={product.quantity === 0}
                onClick={addToCardHandler}
              >
                {t('add-to-cart')}
              </button>
              {product.quantity !== undefined && product.quantity < 10 && product.quantity > 0 && (
                <span className='absolute top-14 text-sm text-red-500'>
                  {t('stock', { amount: product.quantity })}
                </span>
              )}
              {product.quantity === 0 && (
                <span className='absolute top-14 text-sm text-red-500'>
                  {t('out-of-stock')}
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
