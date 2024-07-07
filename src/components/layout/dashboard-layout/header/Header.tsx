import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { stringAvatar } from "@/src/lib/utils";
import Image, { StaticImageData } from "next/image";
import { MainRoutes } from "@/src/constant/routes";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsNone } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import Logo from "@/src/assets/images/logo.webp";
import IrFlag from "@/src/assets/images/languages/fa.png";
import UsFlag from "@/src/assets/images/languages/en.png";
import { useTranslation } from "react-i18next";

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
    <div className="flex items-center justify-between md:justify-normal gap-10 p-6 w-full">
      <div className="flex items-center gap-4">
        <Link href={MainRoutes.HOME}>
          <Image src={Logo} alt="shop" width={144} height={144} />
        </Link>
        <button
          className="bg-axWhite rounded-lg transition-all duration-200 ease-in-out text-axLightPurple hover:bg-axDarkPurple hover:text-white w-10 h-10 flex items-center justify-center"
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
        <button className="bg-axWhite rounded-lg transition-all duration-200 ease-in-out text-axLightPurple hover:bg-axDarkPurple hover:text-axWhite w-10 h-10 flex items-center justify-center">
          <MdNotificationsNone className="w-6 h-6" />
        </button>
        <div className="bg-axBlue rounded-full w-10 h-10 flex items-center justify-center text-axWhite font-bold text-xl">
          {stringAvatar("Ashkan")}
        </div>
      </div>
    </div>
  );
}
