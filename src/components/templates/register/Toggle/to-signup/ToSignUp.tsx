import { MainRoutes } from '@/src/constant/routes';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function ToSignUp({
  setActive,
  active,
}: {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  active: boolean;
}) {
  const { push: pushRouter } = useRouter();

  const handleClick = () => {
    setActive(true);
    pushRouter(`${MainRoutes.REGISTER}?view=signup`);
  };

  const { t, i18n } = useTranslation();

  return (
    <div
      className={`absolute end-0 top-0 h-full px-6 text-center ${
        active
          ? i18n.dir() === 'ltr'
            ? 'translate-x-full'
            : '-translate-x-full'
          : 'translate-x-0'
      } duration-600 flex flex-col items-center justify-center gap-20 transition-all ease-in-out`}
    >
      <h4 className={`text-5xl font-bold ${active ? 'hidden' : 'block'}`}>
        {t('signup-toggle-title')}
      </h4>
      <p className={`text-lg ${active ? 'hidden' : 'block'}`}>
        {t('signup-toggle-description')}
      </p>
      <button
        onClick={handleClick}
        className={`mt-2 rounded-lg border border-white bg-transparent px-14 py-4 text-xs font-semibold uppercase text-white hover:border-axLightPurple hover:bg-axLightPurple ${
          active ? 'hidden' : 'block'
        } ${i18n.dir() === 'ltr' ? 'tracking-wide' : ''}`}
      >
        {t('signup')}
      </button>
    </div>
  );
}
