import dynamic from 'next/dynamic';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Header = dynamic(
  () => import('@/src/components/layout/main-layout/header/Header'),
);

const Footer = dynamic(
  () => import('@/src/components/layout/main-layout/footer/Footer'),
);

export default function Layout({ children }: PropsWithChildren) {
  const [dir, setDir] = useState('ltr');
  const { i18n } = useTranslation();

  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  return (
    <div
      className='relative min-h-screen overflow-hidden bg-white duration-200 dark:bg-gray-900 dark:text-white'
      dir={dir}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
