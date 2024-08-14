import { useGetOrderById } from '@/src/api/orders/orders.queries';
import OrderModalSkeleton from '@/src/components/shared/skeletons/order-modal-skeleton/OrderModalSkeleton';
import OrderedProduct from '@/src/components/templates/dashboard/orders/modals/order-info/ordered-product/OrderedProduct';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';

type UserOrderInfoPopupProps = {
  openInfo: boolean;
  onClose: () => void;
  infoId: string;
};

const UserOrderInfoPopup = ({
  openInfo,
  onClose,
  infoId,
}: UserOrderInfoPopupProps) => {
  // libraries
  const { t } = useTranslation();

  // queries
  const { data: oldOrder, isFetching } = useGetOrderById(infoId);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openInfo ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[95vh] w-full flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-4 text-start shadow transition-all dark:bg-gray-800 sm:w-5/6 md:w-2/3 lg:w-1/2 ${
          openInfo ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className='absolute end-4 top-4 rounded-lg p-1 text-gray-400 hover:text-red-500 dark:hover:text-white'
        >
          <FaTimes />
        </button>

        {/* order info */}
        {isFetching ? (
          <OrderModalSkeleton />
        ) : oldOrder ? (
          <div className='mx-auto flex w-full flex-col gap-4 p-2 sm:p-4'>
            {/* ----------- Customer name ----------- */}
            <p>
              {t('customer-name')} :{' '}
              {oldOrder?.data.order.user !== null
                ? `${oldOrder?.data.order.user.firstname} ${oldOrder?.data.order.user.lastname}`
                : t('user-deleted')}
            </p>

            {/* ----------- Customer address ----------- */}
            <p>
              {t('address')} :{' '}
              {oldOrder?.data.order.user !== null
                ? oldOrder?.data.order.user.address
                : t('user-deleted')}
            </p>

            {/* ----------- Customer phone number ----------- */}
            <p>
              {t('phone')} :{' '}
              {oldOrder?.data.order.user !== null
                ? oldOrder?.data.order.user.phoneNumber
                : t('user-deleted')}
            </p>

            {/* ----------- Order time ----------- */}
            <p>
              {t('delivery-time')} :{' '}
              {new Date(oldOrder?.data.order.deliveryDate).toLocaleDateString(
                'EN',
              )}
            </p>

            {/* ----------- Order time ----------- */}
            <p>
              {t('order-time')} :{' '}
              {new Date(oldOrder?.data.order.createdAt).toLocaleDateString(
                'EN',
              )}
            </p>

            {/* ----------- Ordered products ----------- */}
            <OrderedProduct products={oldOrder?.data.order.products} />

            {/* ----------- Delivery status ----------- */}
            <div className='mx-auto flex w-full justify-center sm:w-2/3 md:w-1/2'>
              {oldOrder?.data.order.deliveryStatus ? (
                <p>
                  {t('delivery-time')} :
                  {new Date(oldOrder?.data.order.updatedAt).toLocaleDateString(
                    'EN',
                  )}
                </p>
              ) : (
                <p>
                  {t('delivery-time')} :
                  {new Date(
                    oldOrder?.data.order.deliveryDate,
                  ).toLocaleDateString('EN')}
                </p>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserOrderInfoPopup;
