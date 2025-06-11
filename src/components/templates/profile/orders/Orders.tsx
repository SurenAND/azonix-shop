// import { useGetOrderByUserId } from '@/src/api/orders/orders.queries'; // Removed
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Loading from '@/src/components/shared/loading/Loading';
// import { useUserContext } from '@/src/context/authContext'; // May not be needed if orders are passed as props
import type { OrderType } from '@/src/api/orders/orders.type'; // Added
import dynamic from 'next/dynamic';
import { useState } from 'react'; // Removed useEffect
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router'; // Added for URL updates
import { useSearchParams } from 'next/navigation'; // Added for URL updates

const OrdersTable = dynamic(
  () =>
    import(
      '@/src/components/templates/profile/orders/orders-table/UserOrdersTable'
    ),
  { loading: () => <Loading /> },
);
const OrderInfoPopup = dynamic(
  () =>
    import(
      '@/src/components/templates/profile/orders/modals/order-info/UserOrderInfo'
    ),
  { loading: () => <Loading /> },
);

export interface RecentOrdersProps {
  orders: OrderType[];
  loading: boolean;
  error?: string | null; // Optional: if ProfilePage handles top-level error display
}

export default function RecentOrders({ orders, loading, error }: RecentOrdersProps) {
  // libraries
  const { t } = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);


  //states
  // const [sortDate, setSortDate] = useState<string>('desc'); // Sorting state now managed by parent via URL
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(false);
  const [infoId, setInfoId] = useState<string>('');

  // contexts
  // const { state } = useUserContext(); // User context might still be needed for user-specific actions if any

  // functions
  const handleSortChange = (newSortValue: string) => {
    // setSortDate(text); // Old way
    params.set('sort', newSortValue); // Assuming 'sort' is the query param key
    // The pathname should be the current profile page path
    // This might need to be dynamic if profile page path can change
    router.push({ pathname: router.pathname, query: Object.fromEntries(params) }, undefined, { shallow: true });
  };

  if (loading) {
    return <Loading />; // Or a more specific skeleton for the orders list
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{t('error_loading_orders', { ns: 'common'})}: {error}</div>;
  }

  return (
    <div className='flex h-[75vh] w-full flex-col items-center p-2'>
      <h1 className='mt-1 p-5 text-3xl font-light'>{t('recent-orders')}</h1>
      <div className='mx-auto flex w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {/* ----------- Table ----------- */}
        {orders.length === 0 ? (
          <EmptyList />
        ) : (
          <OrdersTable
            list={orders} // Use orders from props
            onFilteredList={handleSortChange} // Renamed and updated to change URL param
            setInfoId={setInfoId}
            setOpenInfo={setOpenOrderInfo}
          />
        )}
      </div>

      {/* ----------- Order info popup ----------- */}
      <OrderInfoPopup
        openInfo={openOrderInfo}
        onClose={() => setOpenOrderInfo(false)}
        infoId={infoId}
      />
    </div>
  );
}
