import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import Logo from "@/src/assets/images/logo.webp";
import { MainRoutes } from "@/src/constant/routes";
import { IoSearch } from "react-icons/io5";
import { MdFavoriteBorder, MdOutlineLocalMall } from "react-icons/md";
import { stringAvatar } from "@/src/lib/utils";
import { useRouter } from "next/router";
import IrFlag from "@/src/assets/images/languages/fa.png";
import UsFlag from "@/src/assets/images/languages/en.png";
import { useTranslation } from "react-i18next";
import { useUserContext } from "@/src/context/authContext";
import DarkMode from "@/src/components/shared/dark-mode/DarkMode";

const lngs: Record<"en" | "fa", { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function Header() {
  const { push: pushRouter } = useRouter();
  const { i18n } = useTranslation();
  const { state } = useUserContext();

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 flex items-center justify-between md:justify-normal gap-10 p-6 w-full">
      <Link href={MainRoutes.HOME}>
        <Image src={Logo} alt="shop" width={144} height={144} />
      </Link>
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
      <div>
        <DarkMode />
      </div>
      <div className="flex items-center gap-5">
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
        <button className="bg-axWhite dark:bg-axDarkPurple rounded-lg transition-all duration-200 ease-in-out text-axLightPurple dark:text-axWhite hover:bg-axDarkPurple dark:hover:bg-axLightPurple hover:text-white w-10 h-10 flex items-center justify-center">
          <MdFavoriteBorder className="text-xl" />
        </button>
        <button
          className="bg-axWhite dark:bg-axDarkPurple rounded-lg transition-all duration-200 ease-in-out text-axLightPurple dark:text-axWhite hover:bg-axDarkPurple dark:hover:bg-axLightPurple hover:text-white w-10 h-10 flex items-center justify-center"
          onClick={() => {
            pushRouter(MainRoutes.CART);
          }}
        >
          <button className="relative p-3">
            <MdOutlineLocalMall className="text-xl" />
            <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 end-0 flex items-center justify-center text-xs">
              4
            </div>
          </button>
        </button>
        <div className="bg-axBlue rounded-full w-10 h-10 flex items-center justify-center text-axWhite font-bold uppercase text-xl">
          {stringAvatar(`${state.username}`)}
        </div>
      </div>
    </div>
  );
}
