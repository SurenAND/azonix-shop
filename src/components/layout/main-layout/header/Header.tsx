import { useLogout } from "@/src/api/auth/auth.queries";
import UsFlag from "@/src/assets/images/languages/en.png";
import IrFlag from "@/src/assets/images/languages/fa.png";
import Logo from "@/src/assets/images/logo.webp";
import {
  DropdownLinks,
  MenuLinks,
} from "@/src/components/layout/main-layout/header/data";
import DarkMode from "@/src/components/shared/dark-mode/DarkMode";
import { MainRoutes } from "@/src/constant/routes";
import { useUserContext } from "@/src/context/authContext";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaCaretDown, FaCartShopping } from "react-icons/fa6";
import { IoMdLogIn, IoMdSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const lngs: Record<"en" | "fa", { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function Header() {
  const { t, i18n } = useTranslation();
  const { state } = useUserContext();
  const { mutate: logout } = useLogout();

  const [showMobileDropdown, setShowMobileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and Links section */}
          <div className="flex items-center gap-4">
            <Link href={MainRoutes.HOME}>
              <Image src={Logo} alt="shop" width={144} height={144} />
            </Link>
            {/* Menu Items */}
            <div className="hidden lg:block">
              <ul className="flex items-center gap-4">
                {MenuLinks.map((data) => (
                  <li key={data.id}>
                    <Link
                      href={data.link}
                      className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
                    >
                      {t(data.name)}
                    </Link>
                  </li>
                ))}
                {/* Dropdown */}
                {state.isLogin && (
                  <li className="relative cursor-pointer group">
                    <Link
                      href="#"
                      className="flex items-center gap-[2px] font-semibold text-gray-500 dark:hover:text-white py-2"
                    >
                      {t("quick-links")}
                      <span>
                        <FaCaretDown className="group-hover:rotate-180 duration-300" />
                      </span>
                    </Link>
                    {/* Dropdown Menu */}
                    <div className="absolute z-[999] hidden group-hover:block w-[200px] rounded-md bg-axGray dark:bg-gray-700 p-2 dark:text-white">
                      <ul className="space-y-2">
                        {DropdownLinks.map((data) => (
                          <li
                            key={data.id}
                            className={`${
                              data.roleToAccess.includes(state.role)
                                ? "flex"
                                : "hidden"
                            }`}
                          >
                            <Link
                              href={data.link}
                              className="text-gray-500 dark:text-gray-400 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                            >
                              {t(data.name)}
                            </Link>
                          </li>
                        ))}
                        <li onClick={handleLogout}>
                          <span className="text-gray-500 dark:text-gray-400 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold">
                            {t("logout")}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            {/* Dropdown on Mobile */}
            <div className="relative lg:hidden">
              <button
                className="bg-axWhite dark:bg-axDarkPurple rounded-lg transition-all duration-200 ease-in-out text-axLightPurple dark:text-axWhite hover:bg-axDarkPurple dark:hover:bg-axLightPurple hover:text-white w-10 h-10 flex items-center justify-center"
                onClick={() => setShowMobileDropdown((prev) => !prev)}
              >
                <IoMenu className="w-6 h-6" />
              </button>
              {/* Dropdown Menu */}
              <div
                className={`absolute z-[999] w-[200px] rounded-md bg-axGray dark:bg-gray-700 p-2 dark:text-white ${
                  showMobileDropdown ? "block" : "hidden"
                }`}
              >
                <ul className="space-y-2">
                  {DropdownLinks.map((data) => (
                    <li
                      key={data.id}
                      className={`${
                        data.roleToAccess.includes(state.role)
                          ? "flex"
                          : "hidden"
                      }`}
                    >
                      <Link
                        href={data.link}
                        className="text-gray-500 dark:text-gray-400 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold"
                      >
                        {t(data.name)}
                      </Link>
                    </li>
                  ))}
                  <li onClick={handleLogout}>
                    <span className="text-gray-500 dark:text-gray-400 dark:hover:text-white duration-200 inline-block w-full p-2 hover:bg-primary/20 rounded-md font-semibold">
                      {t("logout")}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4">
            {/* Search Bar section */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder={t("search-for-products")}
                className="search-bar"
              />
              <IoMdSearch
                className={
                  "text-2xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 end-3 duration-200"
                }
              />
            </div>

            {/* Login Button section */}
            {!state.isLogin && (
              <button className="relative p-3">
                <Link href={MainRoutes.REGISTER}>
                  <IoMdLogIn className="text-2xl text-gray-600 dark:text-gray-400" />
                </Link>
                <div className="w-4 h-4 text-gray-600 dark:text-gray-400 absolute bottom-2 end-0 text-sm">
                  {t("login")}
                </div>
              </button>
            )}

            {/* Order Button section */}
            <button className="relative p-3">
              <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
              <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 end-0 flex items-center justify-center text-xs">
                4
              </div>
            </button>

            <div className="flex items-center gap-4">
              {Object.keys(lngs).map((lng) => {
                return (
                  <button
                    key={lng}
                    onClick={() => i18n.changeLanguage(lng)}
                    disabled={i18n.resolvedLanguage === lng}
                  >
                    <Image
                      src={lngs[lng as "en" | "fa"].flag}
                      alt="language"
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
