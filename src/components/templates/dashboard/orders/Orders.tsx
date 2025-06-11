// import { useGetOrders } from '@/src/api/orders/orders.queries'; // Removed
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Loading from '@/src/components/shared/loading/Loading';
import Pagination from '@/src/components/shared/pagination/Pagination';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';
import { useOrderStore } from '@/src/store/order/order.store'; // Added

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
  const { t } = useTranslation();

  const [localIsDelivered, setLocalIsDelivered] = useState<boolean>(false);
  const [localSortDate, setLocalSortDate] = useState<string>('desc'); // e.g., 'deliveryDate-desc'
  const [localPage, setLocalPage] = useState<number>(1);
  const [openOrderInfo, setOpenOrderInfo] = useState<boolean>(false);
  const [infoId, setInfoId] = useState<string>('');

  const {
    fetchAllOrders,
    displayedOrders,
    currentPage,
    totalPages,
    loading,
    error, // TODO: display error
  } = useOrderStore((state) => ({
    fetchAllOrders: state.fetchAllOrders,
    displayedOrders: state.displayedOrders,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    // Adapt localSortDate to match expected format if different, e.g. 'deliveryDate-desc'
    // For now, assuming localSortDate directly maps to a sort param like 'date-desc' or similar.
    // The store's fetchAllOrders uses 'deliveryDate-asc' / 'deliveryDate-desc'.
    let sortParam = localSortDate === 'desc' ? 'deliveryDate-desc' : 'deliveryDate-asc';

    fetchAllOrders({
      page: localPage,
      sort: sortParam,
      deliveryStatus: localIsDelivered,
      // limit: 15 // Default limit is 15 in store if not passed
    });
  }, [localPage, localSortDate, localIsDelivered, fetchAllOrders]);

  const handleSortChange = (newSortValue: string) => {
    // Assuming newSortValue is 'asc' or 'desc for date for now
    setLocalSortDate(newSortValue);
    setLocalPage(1);
  };

  const handleDeliveryStatusChange = (deliver: boolean) => {
    setLocalIsDelivered(deliver);
    setLocalPage(1);
  };

  if (loading && displayedOrders.length === 0) {
      return <div className="text-center p-4">{t('loading')}...</div>;
  }
  if (error) {
      return <div className="text-center p-4 text-red-500">{t('error_loading_orders', {ns: 'common'})}: {error}</div>;
  }

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      <header className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>{t('orders-management')}</h1>
        <div className='flex gap-2'>
          <div
            className='flex cursor-pointer items-center gap-1 border-l border-[#afafaf50] px-2'
            onClick={() => handleDeliveryStatusChange(false)}
          >
            {!localIsDelivered ? ( // Corrected logic for radio button check
              <MdRadioButtonChecked color='#5e35b0' />
            ) : (
              <MdRadioButtonUnchecked color='#5e35b0' />
            )}
            <span>{t('pending-delivery')}</span>
          </div>
          <div
            className='flex cursor-pointer items-center gap-1'
            onClick={() => handleDeliveryStatusChange(true)}
          >
            {localIsDelivered ? ( // Corrected logic
              <MdRadioButtonChecked color='#5e35b0' />
            ) : (
              <MdRadioButtonUnchecked color='#5e35b0' />
            )}
            <span>{t('delivered')}</span>
          </div>
        </div>
      </header>

      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        <Suspense fallback={<Loading />}>
          {displayedOrders.length === 0 && !loading ? (
            <EmptyList />
          ) : (
            <OrdersTable
              list={displayedOrders}
              onFilteredList={handleSortChange} // This prop in OrdersTable might be for sorting
              setInfoId={setInfoId}
              setOpenInfo={setOpenOrderInfo}
            />
          )}
        </Suspense>
      </div>

      {totalPages > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          OnSetPage={(pageNo) => setLocalPage(pageNo)}
        />
      )}

      <Suspense fallback={<Loading />}>
        <OrderInfoPopup
          openInfo={openOrderInfo}
          onClose={() => setOpenOrderInfo(false)}
          infoId={infoId}
          setInfoId={setInfoId} // Assuming OrderInfoPopup might need to clear/change infoId
        />
      </Suspense>
    </main>
  );
};

export default Orders;
