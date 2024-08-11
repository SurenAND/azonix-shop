import AboutUS from '@/src/assets/images/about-us.svg';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

const AboutUsTemplate = () => {
  // libraries
  const { t } = useTranslation();

  return (
    <div className='mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center'>
      {/* about us image */}
      <div className='p-10 sm:w-1/2'>
        <div className='image object-center text-center'>
          <Image src={AboutUS} alt='About US' width={800} height={800} />
        </div>
      </div>

      {/* about us info */}
      <div className='p-5 sm:w-1/2'>
        <div className='text'>
          <span className='border-b-2 border-indigo-600 uppercase text-gray-500'>
            {t('about-us')}
          </span>
          <h2 className='my-4 text-3xl font-bold  sm:text-4xl '>
            {t('about')}
            <span className='text-indigo-600'>{t('company-name')}</span>
          </h2>
          <p className='text-gray-700'>{t('about-us-description')}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsTemplate;
