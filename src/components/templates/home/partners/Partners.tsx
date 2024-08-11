import Partner1 from '@/src/assets/images/partners/p-1.png';
import Partner2 from '@/src/assets/images/partners/p-2.png';
import Partner3 from '@/src/assets/images/partners/p-3.png';
import Partner4 from '@/src/assets/images/partners/p-4.png';
import Partner5 from '@/src/assets/images/partners/p-5.png';

import Image from 'next/image';

const Partners = () => {
  return (
    <div
      data-aos='zoom-out'
      className='mt-24 hidden bg-gray-200 py-8 dark:bg-white/10 md:block'
    >
      <div className='container'>
        <div className='grid grid-cols-5 place-items-center gap-3 opacity-50'>
          <Image
            src={Partner1}
            alt='Partner1'
            className='w-[80px] dark:invert'
          />
          <Image
            src={Partner2}
            alt='Partner2'
            className='w-[80px] dark:invert'
          />
          <Image
            src={Partner3}
            alt='Partner3'
            className='w-[80px] dark:invert'
          />
          <Image
            src={Partner4}
            alt='Partner4'
            className='w-[80px] dark:invert'
          />
          <Image
            src={Partner5}
            alt='Partner5'
            className='w-[80px] dark:invert'
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;
