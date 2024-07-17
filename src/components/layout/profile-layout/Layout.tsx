import { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

const Header = dynamic(
  () => import("@/src/components/layout/profile-layout/header/Header"),
  { ssr: false }
);

const UserSidebar = dynamic(
  () => import("@/src/components/layout/profile-layout/sidebar/SideBar"),
  { ssr: false }
);

const ProfileLayout = ({ children }: PropsWithChildren) => {
  // change direction of the layout based on the language
  const [dir, setDir] = useState("ltr");
  const { i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  return (
    <div className="min-h-screen bg-axGray dark:bg-gray-700 pb-5" dir={dir}>
      <Header />
      <div className="flex flex-col md:flex-row justify-center w-full mt-[5vh] max-md:h-[80vh]">
        <div className="w-full md:w-1/5 rounded-lg md:min-h-[50vh]">
          <UserSidebar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
