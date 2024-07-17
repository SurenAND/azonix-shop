import { MdInbox } from "react-icons/md";
import {
  drawerOrdersItems,
  drawerProductsItems,
  drawerUserItems,
} from "@/src/components/layout/dashboard-layout/sidebar/drawer-list/data";
import { useRouter } from "next/router";
import { MainRoutes } from "@/src/constant/routes";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function DrawerList() {
  const { pathname, push: pushRouter } = useRouter();
  const searchParams = useSearchParams().get("view");
  const state = { role: "moderator" }; // temporary state

  const { t } = useTranslation();

  return (
    <div className="w-64 py-3 px-5 flex flex-col justify-between h-full">
      <div className="flex flex-col gap-1 mb-4">
        <h6 className="font-bold text-lg">{t("dashboard")}</h6>
        <div
          className={`my-2 p-4 rounded-2xl ${
            pathname === MainRoutes.DASHBOARD && !searchParams
              ? "bg-axWhite dark:bg-axLightPurple text-axLightPurple dark:text-axWhite"
              : ""
          }`}
        >
          <button
            onClick={() => pushRouter(MainRoutes.DASHBOARD)}
            className="flex items-center w-full rounded-2xl"
          >
            <MdInbox
              className={`w-5 h-5 ${
                pathname === MainRoutes.DASHBOARD && !searchParams
                  ? "text-axLightPurple dark:text-axWhite"
                  : ""
              }`}
            />
            <span className="ms-3 font-semibold">{t("dashboard")}</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <h6 className="font-bold text-lg">{t("products-management")}</h6>
        {drawerProductsItems.map((item, index) => (
          <div
            key={index}
            className={`my-2 p-4 rounded-2xl ${
              searchParams === item.view ? "bg-axWhite text-axLightPurple" : ""
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.DASHBOARD}?view=${item.view}`)
              }
              className="flex items-center w-full rounded-2xl"
            >
              <div
                className={`${
                  searchParams === item.view ? "text-axLightPurple" : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="ms-3 font-semibold">{t(item.title)}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <h6 className="font-bold text-lg">{t("orders-management")}</h6>
        {drawerOrdersItems.map((item, index) => (
          <div
            key={index}
            className={`my-2 p-4 rounded-2xl ${
              searchParams === item.view ? "bg-axWhite text-axLightPurple" : ""
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.DASHBOARD}?view=${item.view}`)
              }
              className="flex items-center w-full rounded-2xl"
            >
              <div
                className={`${
                  searchParams === item.view ? "text-axLightPurple" : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="ms-3 font-semibold">{t(item.title)}</span>
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-1 mb-4">
        <h6 className="font-bold text-lg">{t("user-management")}</h6>
        {drawerUserItems.map((item, index) => (
          <div
            key={index}
            className={`my-2 p-4 rounded-2xl ${
              searchParams === item.view ? "bg-axWhite text-axLightPurple" : ""
            } ${item.roleToSee.includes(state.role) ? "flex" : "hidden"}`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.DASHBOARD}?view=${item.view}`)
              }
              className="flex items-center w-full rounded-2xl"
            >
              <div
                className={`${
                  searchParams === item.view ? "text-axLightPurple" : ""
                }`}
              >
                {item.icon}
              </div>
              <span className="ms-3 font-semibold">{t(item.title)}</span>
            </button>
          </div>
        ))}
      </div>
      <div>
        <hr className="my-4" />
        <p className="my-4 text-center font-semibold text-sm">
          {t("all-rights-reserved")}
        </p>
      </div>
    </div>
  );
}
