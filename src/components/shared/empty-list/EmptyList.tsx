import { useTranslation } from "react-i18next";

export const EmptyList = () => {
  const { t } = useTranslation();
  return (
    <div className="my-8 min-h-[50vh] flex justify-center items-center w-full">
      <p className="text-center text-black mb-8">{t("empty-list")}</p>
    </div>
  );
};
