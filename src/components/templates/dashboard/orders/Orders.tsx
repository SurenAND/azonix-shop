import { useGetOrders } from '@/src/api/orders/orders.queries';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Pagination from '@/src/components/shared/pagination/Pagination';
import OrderInfoPopup from '@/src/components/templates/dashboard/orders/modals/order-info/OrderInfo';
import { OrdersTable } from '@/src/components/templates/dashboard/orders/orders-table/OrdersTable';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

export const Orders = () => {
  const { t } = useTranslation();
  const [isDelivered, setIsDelivered] = useState(false);
  const [sortDate, setSortDate] = useState('desc');
  const [page, setPage] = useState(1);

  const [openOrderInfo, setOpenOrderInfo] = useState(false);
  const [infoId, setInfoId] = useState<string>('');

  const { data: orders, refetch } = useGetOrders({
    page,
    sort: sortDate,
    delivered: isDelivered,
  });

  useEffect(() => {
    refetch();
  }, [page, sortDate, isDelivered]);

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
        <h1 className='text-lg font-bold'>{t('orders-management')}</h1>
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
            isDelivered={isDelivered}
          />
        )}
      </div>
      {orders && (
        <Pagination
          page={page}
          totalPages={orders.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
      <OrderInfoPopup
        openInfo={openOrderInfo}
        onClose={() => setOpenOrderInfo(false)}
        infoId={infoId}
        setInfoId={setInfoId}
      />
    </main>
  );
};
