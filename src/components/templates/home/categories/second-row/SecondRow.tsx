import Image1 from '@/src/assets/images/category/gaming.png';
import Image3 from '@/src/assets/images/category/speaker.png';
import Image2 from '@/src/assets/images/category/vr.png';
import MyButton from '@/src/components/shared/button/Button';
import { MainRoutes } from '@/src/constant/routes';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const SecondRow = () => {
  // libraries
  const { t, i18n } = useTranslation();
  const { push: pushRouter } = useRouter();

  return (
    <div className='py-8'>
      <div className='container'>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          {/* first col */}
          <div
            className={`relative flex h-[320px] items-end rounded-3xl from-gray-400/90 to-gray-100 py-10 ps-5 text-white sm:col-span-2 ${
              i18n.dir() === 'ltr' ? 'bg-gradient-to-br' : 'bg-gradient-to-bl'
            }`}
          >
            <div>
              <div className='mb-2'>
                <p className='mb-2 text-white'>{t('enjoy')}</p>
                <p className='mb-2 text-2xl font-semibold'>{t('with')}</p>
                <p className='mb-4 text-4xl font-bold opacity-40 xl:text-5xl'>
                  {t('console')}
                </p>
                <MyButton
                  text={t('browse')}
                  bgColor='bg-primary'
                  textColor='text-white'
                  handler={() => pushRouter(`${MainRoutes.SHOP}/console`)}
                />
              </div>
              <Image
                src={Image1}
                alt={t('console')}
                className='absolute -end-0 top-1/2 w-[280px] -translate-y-1/2 sm:w-[380px]'
              />
            </div>
          </div>

          {/* second col */}
          <div className='relative flex h-[320px] items-start rounded-3xl bg-gradient-to-br from-axGreen/90 to-axGreen/90 py-10 ps-5 text-white'>
            <div>
              <div className='mb-2'>
                <p className='mb-2 text-white'>{t('enjoy')}</p>
                <p className='mb-2 text-2xl font-semibold'>{t('with')}</p>
                <p className='mb-4 text-4xl font-bold opacity-50 xl:text-5xl'>
                  {t('oculus')}
                </p>
                <MyButton
                  text={t('browse')}
                  bgColor='bg-white'
                  textColor='text-axGreen'
                  handler={() => pushRouter(`${MainRoutes.SHOP}/oculus`)}
                />
              </div>
              <Image
                src={Image2}
                alt={t('oculus')}
                className='absolute bottom-0 w-[320px]'
              />
            </div>
          </div>

          {/* third col */}
          <div className='relative flex h-[320px] items-start rounded-3xl bg-gradient-to-br from-axBlue to-axBlue/90 py-10 ps-5 text-white'>
            <div>
              <div className='mb-2'>
                <p className='mb-2 text-white'>{t('enjoy')}</p>
                <p className='mb-2 text-2xl font-semibold'>{t('with')}</p>
                <p className='mb-4 text-4xl font-bold opacity-40 xl:text-5xl'>
                  {t('speaker')}
                </p>
                <MyButton
                  text={t('browse')}
                  bgColor='bg-white'
                  textColor='text-axBlue'
                  handler={() => pushRouter(`${MainRoutes.SHOP}/speaker`)}
                />
              </div>
              <Image
                src={Image3}
                alt={t('speaker')}
                className={`absolute bottom-0 end-0 w-[200px] ${
                  i18n.dir() === 'rtl' ? '[transform:rotateY(180deg)]' : ''
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondRow;
