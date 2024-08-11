import Heading from '@/src/components/shared/heading/Heading';
import { blogsData } from '@/src/constant/blogsData';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const RecentNews = () => {
  // libraries
  const { t, i18n } = useTranslation();

  return (
    <div className='my-12' id='blogs'>
      <div className='container'>
        {/* Heading section */}
        <Heading
          title={t('recent-news-title')}
          subtitle={t('recent-news-subtitle')}
        />

        {/* Recent News section */}
        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-7'>
          {/* Blog Card */}
          {blogsData?.map((blog) => (
            <div
              key={blog?.id}
              data-aos='fade-up'
              data-aos-delay={blog?.aosDelay}
              className='bg-white dark:bg-gray-900'
            >
              {/* Image section */}
              <div className='mb-2 overflow-hidden rounded-2xl'>
                <Image
                  src={blog?.image}
                  alt={blog?.titleEN}
                  className='h-[220px] w-full rounded-2xl object-cover duration-500 hover:scale-105'
                />
              </div>

              {/* Content section */}
              <div className='space-y-2'>
                <p className='text-xs text-gray-500'>
                  {i18n.dir() === 'ltr' ? blog?.publishedEN : blog?.publishedFA}
                </p>
                <p className='line-clamp-1 font-bold'>
                  {i18n.dir() === 'ltr' ? blog?.titleEN : blog?.titleFA}
                </p>
                <p className='line-clamp-2 text-sm text-gray-600 dark:text-gray-400'>
                  {i18n.dir() === 'ltr'
                    ? blog?.descriptionEN
                    : blog?.descriptionFA}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentNews;
