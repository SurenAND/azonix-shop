import empty from "@/src/assets/images/empty.png";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export const EmptyList = () => {
  const { t } = useTranslation();
  return (
    <div className="my-8 min-h-[50vh] relative flex justify-center items-center">
      <Image src={empty} alt="end of list" className="w-3/4 max-w-full" />
      <p className="text-center text-black mb-8 absolute top-[40%]">
        {t("empty-list")}
      </p>
    </div>
  );
};
