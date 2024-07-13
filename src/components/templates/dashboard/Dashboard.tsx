import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function DashboardTemplate() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="flex justify-center items-center my-6">
        <div className="flex flex-col items-center justify-center h-screen gap-10">
          <h3 className="text-7xl font-black uppercase">
            {t("hi") + ", Admin"}
          </h3>
          <h4 className="text-6xl capitalize text-center">
            {t("welcome-to-your-dashboard")}
          </h4>
        </div>
      </div>
    )
  );
}

export default DashboardTemplate;
