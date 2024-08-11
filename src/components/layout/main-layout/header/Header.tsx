import { useLogout } from '@/src/api/auth/auth.queries';
import UsFlag from '@/src/assets/images/languages/en.png';
import IrFlag from '@/src/assets/images/languages/fa.png';
import Logo from '@/src/assets/images/logo.webp';
import {
  DropdownLinks,
  MenuLinks,
} from '@/src/components/layout/main-layout/header/data';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import useCheckoutStore from '@/src/store/checkout/checkout.store';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaCaretDown, FaCartShopping } from 'react-icons/fa6';
import { IoMdLogIn, IoMdSearch } from 'react-icons/io';
import { IoMenu } from 'react-icons/io5';

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
  const { t, i18n } = useTranslation();
  const { push: pushRouter } = useRouter();

  // mutations
  const { mutate: logout } = useLogout();

  // contexts & stores
  const { state } = useUserContext();
  const { shoppingCartInfo } = useCheckoutStore();

  // states
  const [showMobileDropdown, setShowMobileDropdown] = useState<boolean>(false);

  // functions
  const handleLogout = () => {
    logout();
  };

  return (
    <div className='relative z-40 bg-white duration-200 dark:bg-gray-900 dark:text-white'>
      <div className='py-4'>
        <div className='container flex items-center justify-between'>
          {/* Logo and Links section */}
          <div className='flex items-center gap-4'>
            <Link href={MainRoutes.HOME}>
              <Image src={Logo} alt='shop' width={144} height={144} />
            </Link>
            {/* Menu Items */}
            <div className='hidden lg:block'>
              <ul className='flex items-center gap-4'>
                {MenuLinks?.map((data) => (
                  <li key={data?.id}>
                    <Link
                      href={data?.link}
                      className='inline-block px-4 font-semibold text-gray-500 duration-200 hover:text-black dark:hover:text-white'
                    >
                      {t(data?.name)}
                    </Link>
                  </li>
                ))}
                {/* Dropdown */}
                {state.isLogin && (
                  <li className='group relative cursor-pointer'>
                    <Link
                      href='#'
                      className='flex items-center gap-[2px] py-2 font-semibold text-gray-500 dark:hover:text-white'
                    >
                      {t('quick-links')}
                      <span>
                        <FaCaretDown className='duration-300 group-hover:rotate-180' />
                      </span>
                    </Link>
                    {/* Dropdown Menu */}
                    <div className='absolute z-[999] hidden w-[200px] rounded-md bg-axGray p-2 group-hover:block dark:bg-gray-700 dark:text-white'>
                      <ul className='space-y-2'>
                        {DropdownLinks?.map((data) => (
                          <li
                            key={data?.id}
                            className={`${
                              data?.roleToAccess.includes(state.role)
                                ? 'flex'
                                : 'hidden'
                            }`}
                          >
                            <Link
                              href={data?.link}
                              className='inline-block w-full rounded-md p-2 font-semibold text-gray-500 duration-200 hover:bg-primary/20 dark:text-gray-400 dark:hover:text-white'
                            >
                              {t(data?.name)}
                            </Link>
                          </li>
                        ))}
                        <li onClick={handleLogout}>
                          <span className='inline-block w-full rounded-md p-2 font-semibold text-gray-500 duration-200 hover:bg-primary/20 dark:text-gray-400 dark:hover:text-white'>
                            {t('logout')}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {/* Dropdown on Mobile */}
            <div className='relative lg:hidden'>
              <button
                className='flex h-10 w-10 items-center justify-center rounded-lg bg-axWhite text-axLightPurple transition-all duration-200 ease-in-out hover:bg-axDarkPurple hover:text-white dark:bg-axDarkPurple dark:text-axWhite dark:hover:bg-axLightPurple'
                onClick={() => setShowMobileDropdown((prev) => !prev)}
              >
                <IoMenu className='h-6 w-6' />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute z-[999] w-[200px] rounded-md bg-axGray p-2 dark:bg-gray-700 dark:text-white ${
                  showMobileDropdown ? 'block' : 'hidden'
                }`}
              >
                <ul className='space-y-2'>
                  {DropdownLinks?.map((data) => (
                    <li
                      key={data?.id}
                      className={`${
                        data?.roleToAccess.includes(state.role)
                          ? 'flex'
                          : 'hidden'
                      }`}
                    >
                      <Link
                        href={data?.link}
                        className='inline-block w-full rounded-md p-2 font-semibold text-gray-500 duration-200 hover:bg-primary/20 dark:text-gray-400 dark:hover:text-white'
                      >
                        {t(data?.name)}
                      </Link>
                    </li>
                  ))}
                  <li onClick={handleLogout}>
                    <span className='inline-block w-full rounded-md p-2 font-semibold text-gray-500 duration-200 hover:bg-primary/20 dark:text-gray-400 dark:hover:text-white'>
                      {t('logout')}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className='flex items-center justify-between gap-4'>
            {/* Search Bar section */}
            <div className='group relative hidden sm:block'>
              <input
                type='text'
                placeholder={t('search-for-products')}
                className='search-bar'
              />
              <IoMdSearch
                className={
                  'absolute end-3 top-1/2 -translate-y-1/2 text-2xl text-gray-600 duration-200 group-hover:text-primary dark:text-gray-400'
                }
              />
            </div>

            {/* Login Button section */}
            {!state.isLogin && (
              <button className='relative p-3'>
                <Link href={MainRoutes.REGISTER}>
                  <IoMdLogIn className='text-2xl text-gray-600 dark:text-gray-400' />
                </Link>
                <div className='absolute bottom-2 end-0 h-4 w-4 text-sm text-gray-600 dark:text-gray-400'>
                  {t('login')}
                </div>
              </button>
            )}

            {/* Order Button section */}
            <button
              className='relative p-3'
              onClick={() => pushRouter(MainRoutes.CART)}
            >
              <FaCartShopping className='text-xl text-gray-600 dark:text-gray-400' />
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

            {/* Language section */}
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
            </div>

            {/* Dark Mode section */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
