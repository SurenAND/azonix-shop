import { useGetOrderByUserId } from '@/src/api/orders/orders.queries';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Loading from '@/src/components/shared/loading/Loading';
import { useUserContext } from '@/src/context/authContext';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

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

export default function RecentOrders() {
  // libraries
  const { t } = useTranslation();

  //states
  const [sortDate, setSortDate] = useState<string>('desc');
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(false);
  const [infoId, setInfoId] = useState<string>('');

  // contexts
  const { state } = useUserContext();

  // queries
  const { data: recentOrderData, refetch } = useGetOrderByUserId(state.userId, {
    sort: sortDate,
  });
  useEffect(() => {
    refetch();
  }, [sortDate]);

  // functions
  const filteredList = (text: string) => {
    setSortDate(text);
  };

  return (
    <div className='flex h-[75vh] w-full flex-col items-center p-2'>
      <h1 className='mt-1 p-5 text-3xl font-light'>{t('recent-orders')}</h1>
      <div className='mx-auto flex w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {/* ----------- Table ----------- */}

        {recentOrderData &&
        recentOrderData.status === 'success' &&
        recentOrderData.data.orders.length === 0 ? (
          <EmptyList />
        ) : (
          <OrdersTable
            list={recentOrderData?.data.orders || []}
            onFilteredList={filteredList}
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
