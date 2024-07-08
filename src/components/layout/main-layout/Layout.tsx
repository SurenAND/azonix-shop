import { PropsWithChildren, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const Header = dynamic(
  () => import("@/src/components/layout/main-layout/header/Header"),
  { ssr: false }
);

const Footer = dynamic(
  () => import("@/src/components/layout/main-layout/footer/Footer"),
  { ssr: false }
);

export default function Layout({ children }: PropsWithChildren) {
  // change direction of the layout based on the language
  const [dir, setDir] = useState("ltr");
  const { i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);
  return (
    <div
      className="relative min-h-screen bg-white dark:bg-gray-900 dark:text-white duration-200"
      dir={dir}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
