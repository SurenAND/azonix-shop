import WishlistEmpty from '@/src/assets/images/wishlist.svg';
import Heading from '@/src/components/shared/heading/Heading';
import WishlistCard from '@/src/components/templates/wishlist/wishlist-card/WishlistCard';
import useWishlistStore from '@/src/store/wishlist/wishlist.store';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const WishlistTemplate = () => {
  // libraries
  const { t } = useTranslation();

  // stores
  const { wishlistItems } = useWishlistStore();

  return (
    <div className='mx-auto my-10 flex h-screen max-w-screen-xl flex-col items-center justify-start'>
      <div className='container'>
        {/* Heading section */}
        <Heading
          title={t('wishlist-title')}
          subtitle={t('wishlist-subtitle')}
        />
        {/* Body section */}
        <div className='mb-10'>
          {/* products */}
          <section className='ms-14 mt-8 flex flex-wrap justify-center gap-5'>
            {wishlistItems?.length > 0 ? (
              wishlistItems?.map((item, index) => (
                <WishlistCard key={item._id} product={item} index={index} />
              ))
            ) : (
              <>
                {/* about us image */}
                <div className='p-10 sm:w-1/2'>
                  <div className='image object-center text-center'>
                    <Image
                      src={WishlistEmpty}
                      alt='wishlist empty'
                      width={800}
                      height={800}
                    />
                  </div>
                </div>

                {/* about us info */}
                <div className='p-5 sm:w-1/2'>
                  <div className='text-center'>
                    <h2 className='my-4 text-3xl font-bold  sm:text-4xl'>
                      {t('wishlist-empty-p1')}{' '}
                      <span className='text-indigo-600'>
                        {t('wishlist-empty-p2')}
                      </span>
                    </h2>
                  </div>
                </div>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default WishlistTemplate;
