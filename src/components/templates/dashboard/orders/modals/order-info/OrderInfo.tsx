import MyButton from '@/src/components/shared/button/Button';
import OrderedProduct from '@/src/components/templates/dashboard/orders/modals/order-info/ordered-product/OrderedProduct';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import { useOrderStore } from '@/src/store/order/order.store'; // Added
import Loading from '@/src/components/shared/loading/Loading'; // Added for loading state

type OrderInfoPopupProps = {
  openInfo: boolean;
  onClose: () => void;
  infoId: string;
  setInfoId: Dispatch<SetStateAction<string>>;
};

const OrderInfoPopup = ({
  openInfo,
  onClose,
  infoId,
  setInfoId,
}: OrderInfoPopupProps) => {
  const { t } = useTranslation();

  const {
    fetchOrderById,
    currentOrder,
    updateOrderStatus,
    loading,
    // error // TODO: Handle error display for fetching/updating order
  } = useOrderStore((state) => ({
    fetchOrderById: state.fetchOrderById,
    currentOrder: state.currentOrder,
    updateOrderStatus: state.updateOrderStatus,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    if (infoId && openInfo) {
      fetchOrderById(infoId);
    }
  }, [infoId, openInfo, fetchOrderById]);

  const handleMarkAsDelivered = () => {
    if (currentOrder) {
      const updatedOrder = updateOrderStatus(currentOrder._id, {
        deliveryStatus: true,
        deliveryDate: new Date().toISOString(), // Update delivery date to now
      });
      if (updatedOrder) {
        toast.success(t('delivered-success'));
        onClose(); // Close modal on success
        setInfoId(''); // Clear infoId
      } else {
        toast.error(t('update_failed', { ns: 'common' }));
      }
    }
  };

  if (!openInfo) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openInfo ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[95vh] w-2/3 flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-6 text-start shadow transition-all dark:bg-gray-800 lg:w-1/2 ${
          openInfo ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className='absolute end-4 top-4 rounded-lg p-1 text-gray-400 hover:text-red-500 dark:hover:text-white'
        >
          <FaTimes />
        </button>

        {loading && !currentOrder && <Loading />}
        {!loading && !currentOrder && infoId && <p>{t('order_not_found', {ns: 'common'})}</p>}

        {currentOrder && currentOrder._id === infoId && ( // Ensure correct order is loaded
          <div className='mx-auto flex w-full max-w-xl flex-col gap-4 p-4'>
            <p>
              {t('customer-name')} :{' '}
              {currentOrder.user !== null
                ? `${currentOrder.user.firstname} ${currentOrder.user.lastname}`
                : t('user-deleted')}
            </p>
            <p>
              {t('address')} :{' '}
              {currentOrder.user !== null
                ? currentOrder.user.address
                : t('user-deleted')}
            </p>
            <p>
              {t('phone')} :{' '}
              {currentOrder.user !== null
                ? currentOrder.user.phoneNumber
                : t('user-deleted')}
            </p>
            <p>
              {t('delivery-time')} :{' '}
              {new Date(currentOrder.deliveryDate).toLocaleDateString('EN')}
            </p>
            <p>
              {t('order-time')} :{' '}
              {new Date(currentOrder.createdAt).toLocaleDateString('EN')}
            </p>

            <OrderedProduct products={currentOrder.products} />

            <div className='mx-auto flex w-1/2 justify-center'>
              {currentOrder.deliveryStatus ? (
                <p className="text-green-600 font-semibold">
                  {t('delivered_on', {ns: 'common'})}: {new Date(currentOrder.deliveryDate).toLocaleDateString('EN')}
                </p>
              ) : (
                <MyButton
                  text={t('mark_as_delivered', {ns: 'common'})} // More specific text
                  bgColor='bg-axGreen'
                  textColor='text-white'
                  handler={handleMarkAsDelivered}
                  isLoading={loading} // Disable button while updating
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderInfoPopup;
