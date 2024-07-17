import UsFlag from "@/src/assets/images/languages/en.png";
import IrFlag from "@/src/assets/images/languages/fa.png";
import Logo from "@/src/assets/images/logo.webp";
import DarkMode from "@/src/components/shared/dark-mode/DarkMode";
import { MainRoutes } from "@/src/constant/routes";
import { stringAvatar } from "@/src/lib/utils";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";

const lngs: Record<"en" | "fa", { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function Header({
  toggleSidebar,
}: {
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
}) {
  const { i18n } = useTranslation();
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 flex items-center justify-between md:justify-normal gap-10 p-6 w-full">
      <div className="flex items-center gap-4">
        <Link href={MainRoutes.HOME}>
          <Image src={Logo} alt="shop" width={144} height={144} />
        </Link>
        <button
          className="bg-axWhite dark:bg-axDarkPurple rounded-lg transition-all duration-200 ease-in-out text-axLightPurple dark:text-axWhite hover:bg-axDarkPurple dark:hover:bg-axLightPurple hover:text-white w-10 h-10 flex items-center justify-center"
          onClick={() => toggleSidebar((prev) => !prev)}
        >
          <IoMenu className="w-6 h-6" />
        </button>
      </div>
      {/* search */}
      <div className="flex-grow text-left px-4 py-2 bg-gray-200 rounded-md text-gray-600 hidden md:flex">
        <div className="relative">
          <span className="absolute inset-y-0 start-0 flex items-center ps-2">
            <IoSearch className="text-gray-600 w-5 h-5" />
          </span>
          <input
            type="text"
            className="w-full bg-gray-200 border-none ps-16 focus:outline-none"
          />
        </div>
      </div>

      {/* Dark Mode section */}
      <div className="hidden md:flex">
        <DarkMode />
      </div>

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
        <button className="bg-axWhite dark:bg-axDarkPurple rounded-lg transition-all duration-200 ease-in-out text-axLightPurple dark:text-axWhite hover:bg-axDarkPurple dark:hover:bg-axLightPurple hover:text-white w-10 h-10 flex items-center justify-center">
          <MdNotificationsNone className="w-6 h-6" />
        </button>
        <div className="bg-axBlue rounded-full w-10 h-10 hidden md:flex items-center justify-center text-axWhite font-bold text-xl">
          {stringAvatar("Ashkan")}
        </div>
      </div>
    </div>
  );
}
