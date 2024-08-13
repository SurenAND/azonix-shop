import AccountSettings from '@/src/components/templates/profile/account-setting/AccountSetting';
import { useUserContext } from '@/src/context/authContext';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

const ProfileTemplate = () => {
  // libraries
  const { t } = useTranslation();
  const searchParams = useSearchParams().get('view');

  // context
  const { state } = useUserContext();

  return (
    <div className='z-50 flex w-full items-center justify-center overflow-y-auto rounded-lg bg-white shadow-ax1 dark:bg-gray-400 max-md:h-full md:w-3/5'>
      {searchParams === 'account-settings' && <AccountSettings />}
      {/* {searchParams === "change-password" && <ChangePassword />} */}
      {/* {searchParams === "your-orders" && <YourOrders />} */}
      {/* {searchParams === "your-address" && <YourAddress />} */}
      {/* {searchParams === "legal-notice" && <LegalNotice />} */}
      {!searchParams && (
        <div className='flex h-full flex-col items-center justify-center space-y-2'>
          <h3 className='text-7xl font-black uppercase'>
            {t('hi') + `, ${state?.username}`}
          </h3>
          <h4 className='text-center text-6xl capitalize'>
            {t('welcome-to-your-profile')}
          </h4>
        </div>
      )}
    </div>
  );
};

export default ProfileTemplate;
