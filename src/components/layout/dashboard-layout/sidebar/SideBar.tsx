import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

const DrawerList = dynamic(
  () =>
    import(
      '@/src/components/layout/dashboard-layout/sidebar/drawer-list/DrawerList'
    ),
  { ssr: true },
);
export default function Sidebar({ open }: { open: boolean }) {
  // libraries
  const { i18n } = useTranslation();
  return (
    <div
      className={`h-auto max-h-[1000px] shrink-0 transform bg-white px-2 py-5 transition-transform duration-200 dark:bg-gray-900 dark:text-white ${
        open
          ? 'translate-x-0'
          : i18n.dir() === 'ltr'
            ? '-translate-x-full'
            : 'translate-x-full'
      } z-50 w-[270px]`}
    >
      <DrawerList />
    </div>
  );
}
