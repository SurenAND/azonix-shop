import { UserSideBarItems } from '@/src/components/layout/profile-layout/sidebar/data';
import { MainRoutes } from '@/src/constant/routes';
import { useUserContext } from '@/src/context/authContext';
import { stringAvatar } from '@/src/lib/utils';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { IoPersonSharp } from 'react-icons/io5';

const UserSidebar = () => {
  const activePage: string | null = useSearchParams().get('view');
  const { pathname, push: pushRouter } = useRouter();
  const { t, i18n } = useTranslation();
  const { state } = useUserContext();

  return (
    <div className='flex flex-row items-end md:flex-col md:items-stretch'>
      <div
        className={`flex flex-grow flex-col items-center gap-2 ${
          i18n.dir() === 'ltr'
            ? 'rounded-tl-lg rounded-tr-lg bg-gradient-to-br md:rounded-bl-2xl md:rounded-tr-none md:bg-gradient-to-tr'
            : 'rounded-tl-lg rounded-tr-lg bg-gradient-to-bl md:rounded-br-2xl md:rounded-tl-none md:bg-gradient-to-tl'
        } from-white from-20% to-gray-200 p-5 dark:from-gray-400 dark:to-gray-700`}
      >
        <div className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-axDarkPurple text-xl font-bold uppercase text-axWhite'>
          {stringAvatar(`${state.username}`)}
        </div>
        <h4 className='text-2xl'>{`${state.username}`}</h4>
        <h6 className='text-xl'>{`38.00${t('currency')}`}</h6>
        <p className='text-sm'>{t('balance')}</p>
      </div>
      <div className='flex flex-row flex-wrap-reverse items-end md:flex-col md:items-stretch'>
        <div
          className={`p-4 md:my-2 ${
            i18n.dir() === 'ltr'
              ? 'rounded-tl-lg md:rounded-bl-2xl'
              : 'rounded-tr-lg md:rounded-br-2xl'
          } ${
            pathname === MainRoutes.PROFILE && !activePage
              ? i18n.dir() === 'ltr'
                ? 'border-l-4 border-axLightPurple bg-gradient-to-r from-white from-70% to-gray-200 dark:from-gray-400 dark:to-gray-700'
                : 'border-r-4 border-axLightPurple bg-gradient-to-l from-white from-70% to-gray-200 dark:from-gray-400 dark:to-gray-700'
              : 'bg-gradient-to-r from-white from-20% to-gray-200 dark:from-gray-400 dark:to-gray-700'
          }`}
        >
          <button
            onClick={() => pushRouter(MainRoutes.PROFILE)}
            className={`flex w-full items-center ${
              i18n.dir() === 'ltr'
                ? 'rounded-bl-2xl rounded-tl-lg'
                : 'rounded-br-2xl rounded-tr-lg'
            }`}
          >
            <div
              className={`h-6 w-6 ${
                pathname === MainRoutes.PROFILE && !activePage
                  ? 'text-axLightPurple'
                  : ''
              }`}
            >
              <IoPersonSharp />
            </div>
            <span
              className={`ml-3 hidden font-semibold md:block ${
                pathname === MainRoutes.PROFILE && !activePage
                  ? 'font-bold'
                  : ''
              }`}
            >
              {t('profile')}
            </span>
          </button>
        </div>
        {UserSideBarItems?.map((data) => (
          <div
            key={data?.id}
            className={`p-4 md:my-2 ${
              i18n.dir() === 'ltr'
                ? 'rounded-bl-2xl rounded-tl-lg'
                : 'rounded-br-2xl rounded-tr-lg'
            } ${
              activePage === data?.view
                ? i18n.dir() === 'ltr'
                  ? 'border-l-4 border-axLightPurple bg-gradient-to-r from-white from-70% to-gray-200 dark:from-gray-400 dark:to-gray-700'
                  : 'border-r-4 border-axLightPurple bg-gradient-to-l from-white from-70% to-gray-200 dark:from-gray-400 dark:to-gray-700'
                : 'bg-gradient-to-r from-white from-20% to-gray-200 dark:from-gray-400 dark:to-gray-700'
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.PROFILE}?view=${data?.view}`)
              }
              className={`flex w-full items-center ${
                i18n.dir() === 'ltr'
                  ? 'rounded-bl-2xl rounded-tl-lg'
                  : 'rounded-br-2xl rounded-tr-lg'
              }`}
            >
              <div
                className={`h-6 w-6 ${
                  activePage === data?.view ? 'text-axLightPurple' : ''
                }`}
              >
                {data?.icon}
              </div>
              <span
                className={`ml-3 hidden font-semibold md:block ${
                  activePage === data?.view ? 'font-bold' : ''
                }`}
              >
                {t(data?.title)}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSidebar;
