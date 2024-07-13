import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";

const DrawerList = dynamic(
  () =>
    import(
      "@/src/components/layout/dashboard-layout/sidebar/drawer-list/DrawerList"
    ),
  { ssr: false }
);
export default function Sidebar({ open }: { open: boolean }) {
  const { i18n } = useTranslation();
  return (
    <div
      className={`bg-white dark:bg-gray-900 dark:text-white duration-200 shrink-0 h-auto py-5 px-2 transition-transform transform ${
        open
          ? "translate-x-0"
          : i18n.dir() === "ltr"
          ? "-translate-x-full"
          : "translate-x-full"
      } w-[270px] z-50`}
    >
      <DrawerList />
    </div>
  );
}
