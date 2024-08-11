import DashboardSkeleton from '@/src/components/shared/skeletons/dashboard-skeleton/DashboardSkeleton';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'sonner';

// dynamic import components
const Orders = dynamic(
  () => import('@/src/components/templates/dashboard/orders/Orders'),
);
const AddProduct = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/add-product/AddProduct'
    ),
);
const Inventory = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/inventory/Inventory'
    ),
);
const ProductManager = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/ProductManager'
    ),
);
const UsersManager = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/UsersManager'
    ),
);

function DashboardTemplate() {
  // libraries
  const { t } = useTranslation();
  const searchParams = useSearchParams().get('view');

  return (
    <>
      <Toaster richColors />
      <div className='my-6 flex items-center justify-center'>
        <Suspense fallback={<DashboardSkeleton />}>
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
  );
}

export default DashboardTemplate;
