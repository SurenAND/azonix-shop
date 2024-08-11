import UsFlag from '@/src/assets/images/languages/en.png';
import IrFlag from '@/src/assets/images/languages/fa.png';
import Logo from '@/src/assets/images/logo.webp';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import { stringAvatar } from '@/src/lib/utils';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMenu, IoSearch } from 'react-icons/io5';
import { MdNotificationsNone } from 'react-icons/md';

const lngs: Record<'en' | 'fa', { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

const DarkMode = dynamic(
  () => import('@/src/components/shared/dark-mode/DarkMode'),
  { ssr: true },
);

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  // libraries
  const { i18n } = useTranslation();

  // contexts
  const { state } = useUserContext();

  return (
    <div className='flex w-full items-center justify-between gap-10 bg-white p-6 duration-200 dark:bg-gray-900 dark:text-white md:justify-normal'>
      <div className='flex items-center gap-4'>
        <Link href={MainRoutes.HOME}>
          <Image src={Logo} alt='shop' width={144} height={144} />
        </Link>
        <button
          className='flex h-10 w-10 items-center justify-center rounded-lg bg-axWhite text-axLightPurple transition-all duration-200 ease-in-out hover:bg-axDarkPurple hover:text-white dark:bg-axDarkPurple dark:text-axWhite dark:hover:bg-axLightPurple'
          onClick={() => toggleSidebar((prev) => !prev)}
        >
          <IoMenu className='h-6 w-6' />
        </button>
      </div>
      {/* search */}
      <div className='hidden flex-grow rounded-md bg-gray-200 px-4 py-2 text-left text-gray-600 md:flex'>
        <div className='relative'>
          <span className='absolute inset-y-0 start-0 flex items-center ps-2'>
            <IoSearch className='h-5 w-5 text-gray-600' />
          </span>
          <input
            type='text'
            className='w-full border-none bg-gray-200 ps-16 focus:outline-none'
          />
        </div>
      </div>

      {/* Dark Mode section */}
      <div className='hidden md:flex'>
        <DarkMode />
      </div>

      <div className='flex items-center gap-4'>
        {Object.keys(lngs).map((lng) => {
          return (
            <button
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              <Image
                src={lngs[lng as 'en' | 'fa'].flag}
                alt='language'
                width={20}
                height={20}
              />
            </button>
          );
        })}
        <button className='flex h-10 w-10 items-center justify-center rounded-lg bg-axWhite text-axLightPurple transition-all duration-200 ease-in-out hover:bg-axDarkPurple hover:text-white dark:bg-axDarkPurple dark:text-axWhite dark:hover:bg-axLightPurple'>
          <MdNotificationsNone className='h-6 w-6' />
        </button>
        <div className='hidden h-10 w-10 items-center justify-center rounded-full bg-axBlue text-xl font-bold text-axWhite md:flex'>
          {stringAvatar(state?.username)}
        </div>
      </div>
    </div>
  );
}
