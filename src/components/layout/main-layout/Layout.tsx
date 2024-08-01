import LoadingPage from '@/src/components/shared/loading-page/LoadingPage';
import dynamic from 'next/dynamic';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = dynamic(
  () => import('@/src/components/layout/main-layout/header/Header'),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/src/components/layout/main-layout/footer/Footer'),
  { ssr: false },
);

export default function Layout({ children }: PropsWithChildren) {
  const [dir, setDir] = useState('ltr');
  const [layoutLoaded, setLayoutLoaded] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    Promise.all([
      import('@/src/components/layout/main-layout/header/Header'),
      import('@/src/components/layout/main-layout/footer/Footer'),
    ]).then(() => setLayoutLoaded(true));
  }, []);

  return (
    <div
      className='relative min-h-screen overflow-hidden bg-white duration-200 dark:bg-gray-900 dark:text-white'
      dir={dir}
    >
      <Header />
      {layoutLoaded ? children : <LoadingPage />}
      <Footer />
    </div>
  );
}
