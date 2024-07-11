import { MainRoutes } from "@/src/constant/routes";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function ToLogIn({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  const { push: pushRouter } = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    setActive(false);
    pushRouter(`${MainRoutes.REGISTER}?view=login`);
  };

  return (
    <div
      className={`absolute h-full px-6 text-center top-0 right-0 ${
        active ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-600 ease-in-out flex flex-col justify-center items-center gap-20`}
    >
      <h4 className={`font-bold text-5xl ${active ? "block" : "hidden"}`}>
        {t("signup-toggle-title")}
      </h4>
      <p className={`text-lg ${active ? "block" : "hidden"}`}>
        {t("signup-toggle-description")}
      </p>
      <button
        onClick={handleClick}
        className={`bg-transparent text-white border border-white text-xs py-4 px-14 rounded-lg font-semibold tracking-wide uppercase mt-2 hover:bg-axLightPurple hover:border-axLightPurple ${
          active ? "block" : "hidden"
        }`}
      >
        {t("login")}
      </button>
    </div>
  );
}
