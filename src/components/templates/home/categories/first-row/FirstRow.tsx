import Image1 from '@/src/assets/images/category/earphone.png';
import Image3 from '@/src/assets/images/category/macbook.png';
import Image2 from '@/src/assets/images/category/watch.png';
import MyButton from '@/src/components/shared/button/Button';
import { MainRoutes } from '@/src/constant/routes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const FirstRow = () => {
  const { t, i18n } = useTranslation();
  const { push: pushRouter } = useRouter();
  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* first col */}
          <div className='relative flex h-[320px] items-end rounded-3xl bg-gradient-to-br from-black/90 to-black/70 py-10 ps-5 text-white'>
            <div>
              <div className='mb-2'>
                <p className='mb-2 text-gray-400'>{t('enjoy')}</p>
                <p className='mb-2 text-2xl font-semibold'>{t('with')}</p>
                <p className='mb-4 text-4xl font-bold opacity-20 xl:text-5xl'>
                  {t('earphone')}
                </p>
                <MyButton
                  text={t('browse')}
                  bgColor='bg-primary'
                  textColor='text-white'
                  handler={() => pushRouter(`${MainRoutes.SHOP}/earphone`)}
                />
              </div>
              <Image
                src={Image1}
                alt={t('earphone')}
                className={`absolute bottom-0 w-[320px] ${
                  i18n.dir() === 'rtl' ? 'start-24' : ''
                }`}
              />
            </div>
          </div>

          {/* second col */}
          <div className='relative flex h-[320px] items-end rounded-3xl bg-gradient-to-br from-axYellow to-axYellow/90 py-10 ps-5 text-white'>
            <div>
              <div className='mb-2'>
                <p className='mb-2 text-white'>{t('enjoy')}</p>
                <p className='mb-2 text-2xl font-semibold'>{t('with')}</p>
                <p className='mb-4 text-4xl font-bold opacity-40 xl:text-5xl'>
                  {t('gadget')}
                </p>
                <MyButton
                  text={t('browse')}
                  bgColor='bg-white'
                  textColor='text-axYellow'
                  handler={() => pushRouter(`${MainRoutes.SHOP}/gadget`)}
                />
              </div>
              <Image
                src={Image2}
                alt={t('gadget')}
                className='absolute -end-7 top-0 w-[320px] sm:end-0'
              />
            </div>
          </div>

          {/* third col */}
          <div className='relative flex h-[320px] items-end rounded-3xl bg-gradient-to-br from-primary to-primary/90 py-10 ps-5 text-white sm:col-span-2'>
            <div>
              <div className='mb-2'>
                <p className='mb-2 text-white'>{t('enjoy')}</p>
                <p className='mb-2 text-2xl font-semibold'>{t('with')}</p>
                <p className='mb-4 text-4xl font-bold opacity-40 xl:text-5xl'>
                  {t('laptop')}
                </p>
                <MyButton
                  text={t('browse')}
                  bgColor='bg-white'
                  textColor='text-primary'
                  handler={() => pushRouter(`${MainRoutes.SHOP}/laptop`)}
                />
              </div>
              <Image
                src={Image3}
                alt={t('laptop')}
                className='absolute -end-0 top-1/2 w-[300px] -translate-y-1/2 sm:w-[420px]'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstRow;
