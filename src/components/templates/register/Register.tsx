import UsFlag from '@/src/assets/images/languages/en.png';
import IrFlag from '@/src/assets/images/languages/fa.png';
import LoginSkeleton from '@/src/components/shared/skeletons/login-skeleton/LoginSkeleton';
import SignupSkeleton from '@/src/components/shared/skeletons/signup-skeleton/SignupSkeleton';
import ToggleRegister from '@/src/components/templates/register/toggle-register/ToggleRegister';
import { MainRoutes } from '@/src/constant/routes';
import dynamic from 'next/dynamic';
import Image, { StaticImageData } from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';

const LogInTemplate = dynamic(
  () => import('@/src/components/templates/register/log-in/LogIn'),
  {
    loading: () => <LoginSkeleton />,
  },
);

const SignUpTemplate = dynamic(
  () => import('@/src/components/templates/register/sign-up/SignUp'),
  {
    loading: () => <SignupSkeleton />,
  },
);

const lngs: Record<'en' | 'fa', { flag: StaticImageData }> = {
  en: { flag: UsFlag },
  fa: { flag: IrFlag },
};

export default function RegisterTemplate() {
  // libraries
  const { t, i18n } = useTranslation();
  const { push: pushRouter } = useRouter();
  const searchParams = useSearchParams().get('view');
  const isSignUp = searchParams === 'signup';

  // states
  const [active, setActive] = useState<boolean>(false);
  const [dir, setDir] = useState<string>('ltr');

  // functions
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
  useEffect(() => {
    setDir(i18n.dir());
  }, [i18n, i18n.resolvedLanguage]);

  useEffect(() => {
    if (isSignUp) {
      setActive(true);
    }
  }, [isSignUp]);

  // redirect to 404 page if the user tries to access a page that does not exist
  if (searchParams && !isSignUp && searchParams !== 'login') {
    pushRouter(MainRoutes.NOTFOUND);
  }

  return (
    <>
      <main
        className='flex min-h-screen select-none flex-col items-center justify-center gap-4 bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] p-5'
        dir={dir}
      >
        <div className='relative min-h-[550px] w-[1000px] max-w-full overflow-hidden rounded-3xl bg-white shadow-lg sm:min-h-[600px]'>
          {isSignUp ? (
            <SignUpTemplate active={active} />
          ) : (
            <LogInTemplate active={active} />
          )}

          {/* toggle between login and signup */}
          <ToggleRegister setActive={setActive} active={active} />
        </div>

        {/* toggle between login and signup in mobile */}
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

          {/* language toggle */}
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
