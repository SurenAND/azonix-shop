import LoadingPage from '@/src/components/shared/loading-page/LoadingPage';
import dynamic from 'next/dynamic';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = dynamic(
  () => import('@/src/components/layout/profile-layout/header/Header'),
  { ssr: true },
);

const UserSidebar = dynamic(
  () => import('@/src/components/layout/profile-layout/sidebar/SideBar'),
  { ssr: true },
);

const ProfileLayout = ({ children }: PropsWithChildren) => {
  const [layoutLoaded, setLayoutLoaded] = useState(false);

  // change direction of the layout based on the language
  const [dir, setDir] = useState('ltr');
  const { i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    Promise.all([
      import('@/src/components/layout/profile-layout/header/Header'),
      import('@/src/components/layout/profile-layout/sidebar/SideBar'),
    ]).then(() => setLayoutLoaded(true));
  }, []);

  return (
    <div className='min-h-screen bg-axGray pb-5 dark:bg-gray-700' dir={dir}>
      <Header />
      <div className='mt-[5vh] flex w-full flex-col justify-center max-md:h-[80vh] md:flex-row'>
        <div className='w-full rounded-lg md:min-h-[50vh] md:w-1/5'>
          <UserSidebar />
        </div>
        {layoutLoaded ? children : <LoadingPage />}
      </div>
    </div>
  );
};

export default ProfileLayout;
