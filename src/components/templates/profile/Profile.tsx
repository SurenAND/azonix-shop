import { useUserContext } from "@/src/context/authContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const ProfileTemplate = () => {
  const { t } = useTranslation();

  const [isClient, setIsClient] = useState(false);

  const { state } = useUserContext();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="flex justify-center items-center md:w-3/5 w-full rounded-lg overflow-y-auto shadow-ax1 bg-white z-50 max-md:h-full">
        {/* profile main section */}
        <div className="flex flex-col items-center justify-center h-full space-y-2">
          <h3 className="text-7xl font-black uppercase">
            {t("hi") + `, ${state.firstname}`}
          </h3>
          <h4 className="text-6xl capitalize text-center">
            {t("welcome-to-your-profile")}
          </h4>
        </div>
      </div>
    )
  );
};

export default ProfileTemplate;
