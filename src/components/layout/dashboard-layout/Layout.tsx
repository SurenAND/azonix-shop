import { PropsWithChildren, useEffect, useState } from "react";
import Header from "@/src/components/layout/dashboard-layout/header/Header";
import Sidebar from "@/src/components/layout/dashboard-layout/sidebar/SideBar";
import { useTranslation } from "react-i18next";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true);

  // change direction of the layout based on the language
  const [dir, setDir] = useState("ltr");
  const { i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen flex flex-col overflow-y-hidden" dir={dir}>
      <Header toggleSidebar={setOpen} />
      <div className="flex">
        <Sidebar open={open} />
        <div
          className={`me-2 rounded-t-3xl bg-axGray transition-all ${
            open
              ? `ms-[-250px] md:ms-0 w-full md:w-[calc(100%_-_270px)] duration-[225ms] ease-out`
              : "ms-[-250px] w-full h-full duration-[195ms] ease-in"
          } overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
