import { lazy, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';

// Lazy load components
const Orders = lazy(
  () => import('@/src/components/templates/dashboard/orders/Orders'),
);
const AddProduct = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/add-product/AddProduct'
    ),
);
const Inventory = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/inventory/Inventory'
    ),
);
const ProductManager = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/ProductManager'
    ),
);
const UsersManager = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/UsersManager'
    ),
);

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
          <Suspense fallback={<div>Loading...</div>}>
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
          </Suspense>
        </div>
      </>
    )
  );
}

export default DashboardTemplate;
