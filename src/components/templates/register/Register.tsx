import UsFlag from '@/src/assets/images/languages/en.png';
import IrFlag from '@/src/assets/images/languages/fa.png';
import Loading from '@/src/components/shared/loading/Loading';
import ToggleRegister from '@/src/components/templates/register/Toggle/ToggleRegister';
import { MainRoutes } from '@/src/constant/routes';
import Image, { StaticImageData } from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';

import dynamic from 'next/dynamic';

const LogInTemplate = dynamic(
  () => import('@/src/components/templates/register/LogIn/LogIn'),
  {
    loading: () => <Loading />,
  },
);

const SignUpTemplate = dynamic(
  () => import('@/src/components/templates/register/SignUp/SignUp'),
  {
    loading: () => <Loading />,
  },
);

const lngs: Record<'en' | 'fa', { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function RegisterTemplate() {
  const [active, setActive] = useState(false);
  const { push: pushRouter } = useRouter();
  const searchParams = useSearchParams().get('view');
  const isSignUp = searchParams === 'signup';

  const handleClick = () => {
    if (active) {
      setActive(false);
      pushRouter(`${MainRoutes.REGISTER}?view=login`);
    } else {
      setActive(true);
      pushRouter(`${MainRoutes.REGISTER}?view=signup`);
    }
  };

  // change direction of the layout based on the language
  const [dir, setDir] = useState('ltr');
  const { t, i18n } = useTranslation();
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n.resolvedLanguage]);

  useEffect(() => {
    if (isSignUp) {
      setActive(true);
    }
  }, [isSignUp]);

  if (searchParams && !isSignUp && searchParams !== 'login') {
    pushRouter(MainRoutes.NOTFOUND);
  }

  return (
    <>
      <main
        className='flex h-screen select-none flex-col items-center justify-center gap-4 bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] p-5'
        dir={dir}
      >
        <div className='relative min-h-[600px] w-[1000px] max-w-full overflow-hidden rounded-3xl bg-white shadow-lg'>
          {isSignUp ? (
            <Suspense fallback={<Loading />}>
              <SignUpTemplate active={active} />
            </Suspense>
          ) : (
            <Suspense fallback={<Loading />}>
              <LogInTemplate active={active} />
            </Suspense>
          )}
          <ToggleRegister setActive={setActive} active={active} />
        </div>
        <div className='flex items-center gap-4' dir='ltr'>
          <div className='text-axLightPurple sm:hidden'>
            {active ? (
              <button
                className={`mt-2 rounded-lg bg-axLightPurple px-7 py-2 text-xs font-semibold uppercase text-white ${
                  i18n.dir() === 'ltr' ? 'tracking-wide' : ''
                }`}
                onClick={handleClick}
              >
                To {t('login')}
              </button>
            ) : (
              <button
                className={`mt-2 rounded-lg bg-axLightPurple px-7 py-2 text-xs font-semibold uppercase text-white ${
                  i18n.dir() === 'ltr' ? 'tracking-wide' : ''
                }`}
                onClick={handleClick}
              >
                To {t('signup')}
              </button>
            )}
          </div>
          {Object.keys(lngs).map((lng) => {
            return (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                disabled={i18n.resolvedLanguage === lng}
              >
                <Image
                  src={lngs[lng as 'en' | 'fa'].flag}
                  alt='language'
                  width={20}
                  height={20}
                />
              </button>
            );
          })}
        </div>
      </main>
      <Toaster richColors />
    </>
  );
}
