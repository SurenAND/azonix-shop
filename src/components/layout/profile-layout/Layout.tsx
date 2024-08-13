import LoadingPage from '@/src/components/shared/loading-page/LoadingPage';
import dynamic from 'next/dynamic';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';

const Header = dynamic(
  () => import('@/src/components/layout/profile-layout/header/Header'),
  { ssr: true },
);

const UserSidebar = dynamic(
  () => import('@/src/components/layout/profile-layout/sidebar/SideBar'),
  { ssr: true, loading: () => <LoadingPage /> },
);

const ProfileLayout = ({ children }: PropsWithChildren) => {
  // libraries
  const { i18n } = useTranslation();

  // states
  const [dir, setDir] = useState<string>('ltr');

  // change direction of the layout based on the language
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n, i18n.resolvedLanguage]);

  return (
    <div className='min-h-screen bg-axGray pb-5 dark:bg-gray-700' dir={dir}>
      <Toaster richColors />
      <Header />
      <div className='mt-[5vh] flex w-full flex-col justify-center max-md:h-[80vh] md:flex-row'>
        <div className='w-full rounded-lg md:min-h-[50vh] md:w-1/5'>
          <UserSidebar />
        </div>
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;
