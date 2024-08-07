import {
  drawerOrdersItems,
  drawerProductsItems,
  drawerUserItems,
} from '@/src/components/layout/dashboard-layout/sidebar/drawer-list/data';
import { MainRoutes } from '@/src/constant/routes';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { MdInbox } from 'react-icons/md';

export default function DrawerList() {
  const { pathname, push: pushRouter } = useRouter();
  const searchParams = useSearchParams().get('view');
  const { t } = useTranslation();

  return (
    <div className='flex h-full w-64 flex-col justify-between px-5 py-3'>
      <div className='mb-4 flex flex-col gap-1'>
        <h6 className='text-lg font-bold'>{t('dashboard')}</h6>
        <div
          className={`my-2 rounded-2xl p-4 ${
            pathname === MainRoutes.DASHBOARD && !searchParams
              ? 'bg-axWhite text-axLightPurple dark:bg-axLightPurple dark:text-axWhite'
              : ''
          }`}
        >
          <button
            onClick={() => pushRouter(MainRoutes.DASHBOARD)}
            className='flex w-full items-center rounded-2xl'
          >
            <MdInbox
              className={`h-5 w-5 ${
                pathname === MainRoutes.DASHBOARD && !searchParams
                  ? 'text-axLightPurple dark:text-axWhite'
                  : ''
              }`}
            />
            <span className='ms-3 font-semibold'>{t('dashboard')}</span>
          </button>
        </div>
      </div>
      <div className='mb-4 flex flex-col gap-1'>
        <h6 className='text-lg font-bold'>{t('products-management')}</h6>
        {drawerProductsItems.map((item, index) => (
          <div
            key={index}
            className={`my-2 rounded-2xl p-4 ${
              searchParams === item.view ? 'bg-axWhite text-axLightPurple' : ''
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.DASHBOARD}?view=${item.view}`)
              }
              className='flex w-full items-center rounded-2xl'
            >
              <div
                className={`${
                  searchParams === item.view ? 'text-axLightPurple' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className='ms-3 font-semibold'>{t(item.title)}</span>
            </button>
          </div>
        ))}
      </div>
      <div className='mb-4 flex flex-col gap-1'>
        <h6 className='text-lg font-bold'>{t('orders-management')}</h6>
        {drawerOrdersItems.map((item, index) => (
          <div
            key={index}
            className={`my-2 rounded-2xl p-4 ${
              searchParams === item.view ? 'bg-axWhite text-axLightPurple' : ''
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.DASHBOARD}?view=${item.view}`)
              }
              className='flex w-full items-center rounded-2xl'
            >
              <div
                className={`${
                  searchParams === item.view ? 'text-axLightPurple' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className='ms-3 font-semibold'>{t(item.title)}</span>
            </button>
          </div>
        ))}
      </div>
      <div className='mb-4 flex flex-col gap-1'>
        <h6 className='text-lg font-bold'>{t('user-management')}</h6>
        {drawerUserItems.map((item, index) => (
          <div
            key={index}
            className={`my-2 rounded-2xl p-4 ${
              searchParams === item.view ? 'bg-axWhite text-axLightPurple' : ''
            }`}
          >
            <button
              onClick={() =>
                pushRouter(`${MainRoutes.DASHBOARD}?view=${item.view}`)
              }
              className='flex w-full items-center rounded-2xl'
            >
              <div
                className={`${
                  searchParams === item.view ? 'text-axLightPurple' : ''
                }`}
              >
                {item.icon}
              </div>
              <span className='ms-3 font-semibold'>{t(item.title)}</span>
            </button>
          </div>
        ))}
      </div>
      <div>
        <hr className='my-4' />
        <p className='my-4 text-center text-sm font-semibold'>
          {t('all-rights-reserved')}
        </p>
      </div>
    </div>
  );
}
