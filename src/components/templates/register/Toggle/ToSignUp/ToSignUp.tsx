import { MainRoutes } from "@/src/constant/routes";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function ToSignUp({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  const { push: pushRouter } = useRouter();

  const handleClick = () => {
    setActive(true);
    pushRouter(`${MainRoutes.REGISTER}?view=signup`);
  };

  const { t, i18n } = useTranslation();

  return (
    <div
      className={`absolute h-full px-6 text-center top-0 end-0 ${
        active
          ? i18n.dir() === "ltr"
            ? "translate-x-full"
            : "-translate-x-full"
          : "translate-x-0"
      } transition-all duration-600 ease-in-out flex flex-col justify-center items-center gap-20`}
    >
      <h4 className={`font-bold text-5xl ${active ? "hidden" : "block"}`}>
        {t("signup-toggle-title")}
      </h4>
      <p className={`text-lg ${active ? "hidden" : "block"}`}>
        {t("signup-toggle-description")}
      </p>
      <button
        onClick={handleClick}
        className={`bg-transparent text-white border border-white text-xs py-4 px-14 rounded-lg font-semibold uppercase mt-2 hover:bg-axLightPurple hover:border-axLightPurple ${
          active ? "hidden" : "block"
        } ${i18n.dir() === "ltr" ? "tracking-wide" : ""}`}
      >
        {t("signup")}
      </button>
    </div>
  );
}
