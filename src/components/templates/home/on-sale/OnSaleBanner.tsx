import Image, { StaticImageData } from 'next/image';
import { useTranslation } from 'react-i18next';
type OnSaleBannerProps = {
  data: {
    discountEN: string;
    discountFA: string;
    titleEN: string;
    titleFA: string;
    dateEN: string;
    dateFA: string;
    image: StaticImageData;
    title2EN: string;
    title2FA: string;
    title3EN: string;
    title3FA: string;
    title4EN: string;
    title4FA: string;
    bgColor: string;
  };
};

const OnSaleBanner = ({ data }: OnSaleBannerProps) => {
  // libraries
  const { t, i18n } = useTranslation();

  return (
    <div className='flex min-h-[550px] items-center justify-center py-12'>
      <div className='container'>
        <div
          className='grid grid-cols-1 items-center gap-6 rounded-3xl text-white md:grid-cols-3'
          style={{ backgroundColor: data.bgColor }}
        >
          {/* first col */}
          <div className='flex flex-col justify-center gap-4 p-6 sm:p-8'>
            <p data-aos='slide-right'>
              {i18n.dir() === 'ltr' ? data.discountEN : data.discountFA}
            </p>
            <h1
              data-aos='zoom-out'
              className='text-4xl font-bold uppercase lg:text-7xl'
            >
              {i18n.dir() === 'ltr' ? data.titleEN : data.titleFA}
            </h1>
            <p data-aos='fade-up'>
              {i18n.dir() === 'ltr' ? data.dateEN : data.dateFA}
            </p>
          </div>

          {/* second col */}
          <div data-aos='zoom-in' className='flex h-full items-center'>
            <Image
              src={data.image}
              alt='on sale'
              className='mx-auto w-[250px] scale-125 object-cover drop-shadow-[-8px_4px_6px_rgba(0,0,0,.4)] md:w-[340px]'
            />
          </div>

          {/* third col */}
          <div className='flex flex-col justify-center gap-4 p-6 sm:p-8'>
            <p data-aos='zoom-out' className='text-xl font-bold'>
              {i18n.dir() === 'ltr' ? data.title2EN : data.title2FA}
            </p>
            <p data-aos='fade-up' className='text-3xl font-bold sm:text-5xl'>
              {i18n.dir() === 'ltr' ? data.title3EN : data.title3FA}
            </p>
            <p
              data-aos='fade-up'
              className={`text-sm leading-5 ${
                i18n.dir() === 'ltr' ? 'tracking-wide' : ''
              }`}
            >
              {i18n.dir() === 'ltr' ? data.title4EN : data.title4FA}
            </p>
            <div data-aos='fade-up' data-aos-offset='0'>
              <button
                className='rounded-full bg-white px-4 py-2'
                style={{ color: data.bgColor }}
              >
                {t('shop-now')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnSaleBanner;
