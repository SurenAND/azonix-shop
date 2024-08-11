import Header from '@/src/components/layout/dashboard-layout/header/Header';
import Sidebar from '@/src/components/layout/dashboard-layout/sidebar/SideBar';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DashboardLayout({ children }: PropsWithChildren) {
  // libraries
  const { i18n } = useTranslation();

  // states
  const [open, setOpen] = useState<boolean>(true);
  const [dir, setDir] = useState<string>('ltr');

  // change direction of the layout based on the language
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n, i18n.resolvedLanguage]);

  return (
    <div
      className='flex min-h-screen flex-col overflow-y-hidden bg-white duration-200 dark:bg-gray-900 dark:text-white'
      dir={dir}
    >
      <Header toggleSidebar={setOpen} />
      <div className='flex'>
        <Sidebar open={open} />
        <div
          className={`me-2 rounded-t-3xl bg-axGray transition-all dark:bg-gray-700 ${
            open
              ? `ms-[-250px] w-full duration-[225ms] ease-out md:ms-0 md:w-[calc(100%_-_270px)]`
              : 'ms-[-250px] w-full duration-[195ms] ease-in'
          } overflow-hidden`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
