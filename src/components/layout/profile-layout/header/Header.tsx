import UsFlag from '@/src/assets/images/languages/en.png';
import IrFlag from '@/src/assets/images/languages/fa.png';
import Logo from '@/src/assets/images/logo.webp';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import { stringAvatar } from '@/src/lib/utils';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import useWishlistStore from '@/src/store/wishlist/wishlist.store';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiWorld } from 'react-icons/bi';
import { IoSearch } from 'react-icons/io5';
import { MdFavoriteBorder, MdOutlineLocalMall } from 'react-icons/md';

const DarkMode = dynamic(
  () => import('@/src/components/shared/dark-mode/DarkMode'),
  { ssr: true },
);

const lngs: Record<'en' | 'fa', { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function Header() {
  // libraries
  const { push: pushRouter } = useRouter();
  const { i18n } = useTranslation();

  // contexts & stores
  const { state } = useUserContext();
  const { shoppingCartInfo } = useCheckoutStore();
  const { wishlistItems } = useWishlistStore();

  // states
  const [showMobileLngDropdown, setShowMobileLngDropdown] =
    useState<boolean>(false);

  return (
    <div className='flex w-full items-center justify-between gap-10 bg-white p-6 duration-200 dark:bg-gray-900 dark:text-white md:justify-normal'>
      <div className='container flex flex-col items-center justify-between gap-5 sm:flex-row'>
        <div className='flex w-full items-center justify-center gap-4'>
          <Link href={MainRoutes.HOME}>
            <Image src={Logo} alt='shop' width={144} height={144} />
          </Link>
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
          <div>
            <DarkMode />
          </div>

          {/* Language section */}
          <div className='hidden items-center gap-4 sm:flex'>
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
          </div>

          {/* Language section on Mobile */}
          <div className='relative sm:hidden'>
            <button
              className='flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition-all duration-200 ease-in-out dark:text-gray-400'
              onClick={() => setShowMobileLngDropdown((prev) => !prev)}
            >
              <BiWorld className='h-6 w-6' />
            </button>
            {/* Dropdown Menu */}
            <div
              className={`absolute z-[999] rounded-md bg-axGray p-2 dark:bg-gray-700 dark:text-white ${
                showMobileLngDropdown ? 'block' : 'hidden'
              }`}
            >
              <ul className='space-y-2'>
                {Object.keys(lngs).map((lng) => {
                  return (
                    <li onClick={() => setShowMobileLngDropdown(false)}>
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
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Wishlist & Cart & User section */}
        <div className='flex items-center gap-4'>
          {/* Wishlist section */}
          <button
            className='flex h-10 w-10 items-center justify-center rounded-lg bg-axWhite text-axLightPurple transition-all duration-200 ease-in-out hover:bg-axDarkPurple hover:text-white dark:bg-axDarkPurple dark:text-axWhite dark:hover:bg-axLightPurple'
            onClick={() => {
              pushRouter(MainRoutes.WISHLIST);
            }}
          >
            <button className='relative p-3'>
              <MdFavoriteBorder className='text-xl' />
              {wishlistItems?.filter((item) => item?.userId === state.userId)
                .length > 0 && (
                <div className='absolute end-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                  {
                    wishlistItems?.filter(
                      (item) => item?.userId === state.userId,
                    ).length
                  }
                </div>
              )}
            </button>
          </button>

          {/* Cart section */}
          <button
            className='flex h-10 w-10 items-center justify-center rounded-lg bg-axWhite text-axLightPurple transition-all duration-200 ease-in-out hover:bg-axDarkPurple hover:text-white dark:bg-axDarkPurple dark:text-axWhite dark:hover:bg-axLightPurple'
            onClick={() => {
              pushRouter(MainRoutes.CART);
            }}
          >
            <button className='relative p-3'>
              <MdOutlineLocalMall className='text-xl' />
              {shoppingCartInfo?.filter((item) => item?.userId === state.userId)
                .length > 0 && (
                <div className='absolute end-0 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                  {
                    shoppingCartInfo?.filter(
                      (item) => item?.userId === state.userId,
                    ).length
                  }
                </div>
              )}
            </button>
          </button>

          {/* User section */}
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-axBlue text-xl font-bold uppercase text-axWhite'>
            {stringAvatar(`${state?.username}`)}
          </div>
        </div>
      </div>
    </div>
  );
}
