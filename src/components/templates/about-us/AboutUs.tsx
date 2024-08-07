import AboutUS from '@/src/assets/images/about-us.svg';
import Image from 'next/image';
const AboutUsTemplate = () => {
  return (
    <div className='mx-auto flex h-screen max-w-screen-xl flex-col items-center justify-center'>
      <div className='p-10 sm:w-1/2'>
        <div className='image object-center text-center'>
          <Image src={AboutUS} alt='About US' width={800} height={800} />
        </div>
      </div>
      <div className='p-5 sm:w-1/2'>
        <div className='text'>
          <span className='border-b-2 border-indigo-600 uppercase text-gray-500'>
            About us
          </span>
          <h2 className='my-4 text-3xl font-bold  sm:text-4xl '>
            About <span className='text-indigo-600'>Our Company</span>
          </h2>
          <p className='text-gray-700'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid,
            commodi doloremque, fugiat illum magni minus nisi nulla numquam
            obcaecati placeat quia, repellat tempore voluptatum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsTemplate;
