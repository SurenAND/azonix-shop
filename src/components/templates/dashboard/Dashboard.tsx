import { Orders } from '@/src/components/templates/dashboard/orders/Orders';
import AddProduct from '@/src/components/templates/dashboard/products-management/add-product/AddProduct';
import Inventory from '@/src/components/templates/dashboard/products-management/inventory/Inventory';
import ProductManager from '@/src/components/templates/dashboard/products-management/product-manager/ProductManager';
import UsersManager from '@/src/components/templates/dashboard/user-manager/users/UsersManager';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';

function DashboardTemplate() {
  const { t } = useTranslation();
  const searchParams = useSearchParams().get('view');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <>
        <Toaster richColors />
        <div className='my-6 flex items-center justify-center'>
          {searchParams === 'inventory' && <Inventory />}
          {searchParams === 'add-product' && <AddProduct />}
          {searchParams === 'product-manager' && <ProductManager />}
          {searchParams === 'users-manager' && <UsersManager />}
          {searchParams === 'orders' && <Orders />}
          {!searchParams && (
            <div className='flex h-screen flex-col items-center justify-center gap-10'>
              <h3 className='text-7xl font-black uppercase'>
                {t('hi') + ', Admin'}
              </h3>
              <h4 className='text-center text-6xl capitalize'>
                {t('welcome-to-your-dashboard')}
              </h4>
            </div>
          )}
        </div>
      </>
    )
  );
}

export default DashboardTemplate;
