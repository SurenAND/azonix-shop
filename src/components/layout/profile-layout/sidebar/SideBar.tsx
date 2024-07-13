import { stringAvatar } from "@/src/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { MainRoutes } from "@/src/constant/routes";
import { IoPersonSharp } from "react-icons/io5";
import { UserSideBarItems } from "@/src/components/layout/profile-layout/sidebar/data";
import { useUserContext } from "@/src/context/authContext";

const UserSidebar = () => {
  const activePage: string | null = useSearchParams().get("view");
  const { pathname, push: pushRouter } = useRouter();
  const { t, i18n } = useTranslation();
  const { state } = useUserContext();

  return (
    <div className="flex flex-row items-end md:items-stretch md:flex-col">
      <div
        className={`flex flex-col flex-grow items-center gap-2 ${
          i18n.dir() === "ltr"
            ? "md:bg-gradient-to-tr bg-gradient-to-br rounded-tl-lg md:rounded-bl-2xl rounded-tr-lg md:rounded-tr-none"
            : "md:bg-gradient-to-tl bg-gradient-to-bl rounded-tr-lg md:rounded-br-2xl rounded-tl-lg md:rounded-tl-none"
        } from-20% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700 p-5`}
      >
        <div className="bg-axDarkPurple rounded-full w-[70px] h-[70px] flex items-center justify-center text-axWhite font-bold uppercase text-xl">
          {stringAvatar(`${state.username}`)}
        </div>
        <h4 className="text-2xl">{`${state.username}`}</h4>
        <h6 className="text-xl">{`38.00${t("currency")}`}</h6>
        <p className="text-sm">{t("balance")}</p>
      </div>
      <div className="flex flex-row items-end md:items-stretch md:flex-col flex-wrap-reverse">
        <div
          className={`md:my-2 p-4 ${
            i18n.dir() === "ltr"
              ? "rounded-tl-lg md:rounded-bl-2xl"
              : "rounded-tr-lg md:rounded-br-2xl"
          } ${
            pathname === MainRoutes.PROFILE && !activePage
              ? i18n.dir() === "ltr"
                ? "bg-gradient-to-r from-70% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700 border-l-4 border-axLightPurple"
                : "bg-gradient-to-l from-70% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700 border-r-4 border-axLightPurple"
              : "bg-gradient-to-r from-20% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700"
          }`}
        >
          <button
            onClick={() => pushRouter(MainRoutes.PROFILE)}
            className={`flex items-center w-full ${
              i18n.dir() === "ltr"
                ? "rounded-tl-lg rounded-bl-2xl"
                : "rounded-tr-lg rounded-br-2xl"
            }`}
          >
            <div
              className={`w-6 h-6 ${
                pathname === MainRoutes.PROFILE && !activePage
                  ? "text-axLightPurple"
                  : ""
              }`}
            >
              <IoPersonSharp />
            </div>
            <span
              className={`ml-3 hidden md:block font-semibold ${
                pathname === MainRoutes.PROFILE && !activePage
                  ? "font-bold"
                  : ""
              }`}
            >
              {t("profile")}
            </span>
          </button>
        </div>
        {UserSideBarItems.map((data) => (
          <div
            key={data.id}
            className={`md:my-2 p-4 ${
              i18n.dir() === "ltr"
                ? "rounded-tl-lg rounded-bl-2xl"
                : "rounded-tr-lg rounded-br-2xl"
            } ${
              activePage === data.view
                ? i18n.dir() === "ltr"
                  ? "bg-gradient-to-r from-70% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700 border-l-4 border-axLightPurple"
                  : "bg-gradient-to-l from-70% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700 border-r-4 border-axLightPurple"
                : "bg-gradient-to-r from-20% from-white dark:from-gray-400 to-gray-200 dark:to-gray-700"
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.PROFILE}?view=${data.view}`)
              }
              className={`flex items-center w-full ${
                i18n.dir() === "ltr"
                  ? "rounded-tl-lg rounded-bl-2xl"
                  : "rounded-tr-lg rounded-br-2xl"
              }`}
            >
              <div
                className={`w-6 h-6 ${
                  activePage === data.view ? "text-axLightPurple" : ""
                }`}
              >
                {data.icon}
              </div>
              <span
                className={`ml-3 hidden md:block font-semibold ${
                  activePage === data.view ? "font-bold" : ""
                }`}
              >
                {t(data.title)}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;
