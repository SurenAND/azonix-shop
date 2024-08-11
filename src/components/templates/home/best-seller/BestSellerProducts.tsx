import Heading from '@/src/components/shared/heading/Heading';
import ProductCard from '@/src/components/templates/home/best-seller/product-card/ProductCard';
import { productsData } from '@/src/constant/bestSellerData';
import { useTranslation } from 'react-i18next';

const BestSellerProducts = () => {
  // libraries
  const { t } = useTranslation();

  return (
    <div>
      <div className='container'>
        {/* Heading section */}
        <Heading
          title={t('bestseller-title')}
          subtitle={t('bestseller-subtitle')}
        />
        {/* Body section */}
        <div className='mb-10'>
          <div className='grid grid-cols-1 place-items-center gap-5 sm:grid-cols-2 md:grid-cols-4'>
            {/* Product Cards */}
            {productsData?.map((product) => (
              <ProductCard key={product?.id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellerProducts;
