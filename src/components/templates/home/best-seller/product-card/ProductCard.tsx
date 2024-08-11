import MyButton from '@/src/components/shared/button/Button';
import Image, { StaticImageData } from 'next/image';
import { useTranslation } from 'react-i18next';

type ProductCardProps = {
  data: {
    id: number;
    img: StaticImageData;
    title: string;
    price: string;
    aosDelay: string;
  };
};

const ProductCard = ({ data }: ProductCardProps) => {
  // libraries
  const { t, i18n } = useTranslation();

  return (
    <div data-aos='fade-up' data-aos-delay={data.aosDelay} className='group'>
      <div className='relative'>
        <Image
          src={data.img}
          alt={data.title}
          className='h-[180px] w-[260px] rounded-md object-cover'
        />
        {/* hover effect */}
        <div
          className={`absolute start-1/2 top-1/2 hidden h-full w-full -translate-y-1/2 items-center justify-center text-center duration-200 group-hover:flex group-hover:backdrop-blur-sm ${
            i18n.dir() === 'ltr' ? '-translate-x-1/2' : 'translate-x-1/2'
          }`}
        >
          <MyButton
            text={t('add-to-cart')}
            bgColor='bg-primary'
            textColor='text-white'
          />
        </div>
      </div>
      <div className='leading-7'>
        <h2 className='font-semibold'>{data.title}</h2>
        <p className='font-bold'>${data.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
