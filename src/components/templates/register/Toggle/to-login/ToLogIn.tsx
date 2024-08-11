import { MainRoutes } from '@/src/constant/routes';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

type ToLogInProps = {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
};

export default function ToLogIn({ setActive, active }: ToLogInProps) {
  // libraries
  const { t, i18n } = useTranslation();
  const { push: pushRouter } = useRouter();

  // functions
  const handleClick = () => {
    setActive(false);
    pushRouter(`${MainRoutes.REGISTER}?view=login`);
  };

  return (
    <div
      className={`absolute end-0 top-0 h-full px-6 text-center ${
        active
          ? 'translate-x-0'
          : i18n.dir() === 'ltr'
            ? '-translate-x-full'
            : 'translate-x-full'
      } duration-600 flex flex-col items-center justify-center gap-20 transition-all ease-in-out`}
    >
      <h4 className={`text-5xl font-bold ${active ? 'block' : 'hidden'}`}>
        {t('login-toggle-title')}
      </h4>
      <p className={`text-lg ${active ? 'block' : 'hidden'}`}>
        {t('login-toggle-description')}
      </p>
      <button
        onClick={handleClick}
        className={`mt-2 rounded-lg border border-white bg-transparent px-14 py-4 text-xs font-semibold uppercase text-white hover:border-axLightPurple hover:bg-axLightPurple ${
          active ? 'block' : 'hidden'
        } ${i18n.dir() === 'ltr' ? 'tracking-wide' : ''}`}
      >
        {t('login')}
      </button>
    </div>
  );
}
