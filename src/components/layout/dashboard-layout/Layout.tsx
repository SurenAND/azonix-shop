import Header from '@/src/components/layout/dashboard-layout/header/Header';
import Sidebar from '@/src/components/layout/dashboard-layout/sidebar/SideBar';
import LoadingPage from '@/src/components/shared/loading-page/LoadingPage';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(true);
  const [layoutLoaded, setLayoutLoaded] = useState(false);

  // change direction of the layout based on the language
  const [dir, setDir] = useState('ltr');
  const { i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    Promise.all([
      import('@/src/components/layout/dashboard-layout/header/Header'),
      import('@/src/components/layout/dashboard-layout/sidebar/SideBar'),
    ]).then(() => setLayoutLoaded(true));
  }, []);

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
          {layoutLoaded ? children : <LoadingPage />}
        </div>
      </div>
    </div>
  );
}
