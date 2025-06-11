import AccountSettings from '@/src/components/templates/profile/account-setting/AccountSetting';
import ChangePassword from '@/src/components/templates/profile/change-password/changePassword';
import LegalNotice from '@/src/components/templates/profile/legal-notice/legalNotice';
import RecentOrders from '@/src/components/templates/profile/orders/Orders';
// import { useUserContext } from '@/src/context/authContext'; // Replaced by user prop
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import type { User } from '@/src/store/auth/auth.type';
import type { OrderType } from '@/src/api/orders/orders.type';
import type { CategoryType } from '@/src/api/category/category.type'; // Added, though not used in JSX yet

export interface ProfileTemplateProps {
  user: User | null;
  orders: OrderType[];
  categories: CategoryType[]; // For consistency, though not directly used in this template's JSX
  loading: boolean; // Loading state for orders
  error?: string | null; // Error state for orders
}

const ProfileTemplate = ({ user, orders, categories, loading, error }: ProfileTemplateProps) => {
  // libraries
  const { t } = useTranslation();
  const searchParams = useSearchParams().get('view');

  // context
  // const { state } = useUserContext(); // Replaced by user prop

  return (
    <div className='z-50 flex w-full items-center justify-center overflow-y-auto rounded-lg bg-white shadow-ax1 dark:bg-gray-400 max-md:h-full md:w-3/5'>
      {searchParams === 'account-settings' && <AccountSettings />}
      {searchParams === 'change-password' && <ChangePassword />}
      {searchParams === 'your-orders' && (
        <RecentOrders orders={orders} loading={loading} error={error} />
      )}
      {searchParams === 'legal-notice' && <LegalNotice />}
      {!searchParams && user && ( // Check if user exists before displaying welcome
        <div className='flex h-full flex-col items-center justify-center space-y-2'>
          <h3 className='text-7xl font-black uppercase'>
            {t('hi') + `, ${user?.username}`}
          </h3>
          <h4 className='text-center text-6xl capitalize'>
            {t('welcome-to-your-profile')}
          </h4>
        </div>
      )}
      {!searchParams && !user && !loading && ( // If no specific view, no user, and not loading (e.g. initial state or error)
         <div className='flex h-full flex-col items-center justify-center space-y-2'>
            <h3 className='text-4xl font-black'>{t('please_log_in', {ns: 'common'})}</h3>
         </div>
      )}
       {!searchParams && loading && ( // If no specific view and loading user data
         <div className='flex h-full flex-col items-center justify-center space-y-2'>
            <h3 className='text-4xl font-black'>{t('loading_profile', {ns: 'common'})}</h3>
         </div>
      )}
    </div>
  );
};

export default ProfileTemplate;
