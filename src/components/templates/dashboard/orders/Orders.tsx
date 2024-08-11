import { useGetOrders } from '@/src/api/orders/orders.queries';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Loading from '@/src/components/shared/loading/Loading';
import Pagination from '@/src/components/shared/pagination/Pagination';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const OrdersTable = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/orders/orders-table/OrdersTable'
    ),
);
const OrderInfoPopup = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/orders/modals/order-info/OrderInfo'
    ),
);

const Orders = () => {
  // libraries
  const { t } = useTranslation();

  // states
  const [isDelivered, setIsDelivered] = useState<boolean>(false);
  const [sortDate, setSortDate] = useState<string>('desc');
  const [page, setPage] = useState<number>(1);
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(false);
  const [infoId, setInfoId] = useState<string>('');

  // queries
  const { data: orders, refetch } = useGetOrders({
    page,
    sort: sortDate,
    deliveryStatus: isDelivered,
  });

  useEffect(() => {
    refetch();
  }, [page, sortDate, isDelivered]);

  // functions
  const filteredList = (text: string) => {
    setSortDate(text);
    setPage(1);
  };

  const deliverHandler = (deliver: boolean) => {
    setIsDelivered(deliver);
    setPage(1);
  };

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      <header className='flex items-center justify-between'>
        {/* ----------- Title ----------- */}
        <h1 className='text-lg font-bold'>{t('orders-management')}</h1>

        {/* ----------- Filter buttons ----------- */}
        <div className='flex gap-2'>
          <div
            className='flex items-center gap-1 border-l border-[#afafaf50] px-2'
            onClick={() => deliverHandler(false)}
          >
            {isDelivered ? (
              <MdRadioButtonUnchecked color='#5e35b0' />
            ) : (
              <MdRadioButtonChecked color='#5e35b0' />
            )}
            <span>{t('pending-delivery')}</span>
          </div>
          <div
            className='flex items-center gap-1'
            onClick={() => deliverHandler(true)}
          >
            {isDelivered ? (
              <MdRadioButtonChecked color='#5e35b0' />
            ) : (
              <MdRadioButtonUnchecked color='#5e35b0' />
            )}
            <span>{t('delivered')}</span>
          </div>
        </div>
      </header>

      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {/* ----------- Table ----------- */}
        <Suspense fallback={<Loading />}>
          {orders &&
          orders.status === 'success' &&
          orders.data.orders.length === 0 ? (
            <EmptyList />
          ) : (
            <OrdersTable
              list={orders?.data.orders || []}
              onFilteredList={filteredList}
              setInfoId={setInfoId}
              setOpenInfo={setOpenOrderInfo}
            />
          )}
        </Suspense>
      </div>

      {/* ----------- Pagination ----------- */}
      {orders && (
        <Pagination
          page={page}
          totalPages={orders.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}

      {/* ----------- Order info popup ----------- */}
      <Suspense fallback={<Loading />}>
        <OrderInfoPopup
          openInfo={openOrderInfo}
          onClose={() => setOpenOrderInfo(false)}
          infoId={infoId}
          setInfoId={setInfoId}
        />
      </Suspense>
    </main>
  );
};

export default Orders;
