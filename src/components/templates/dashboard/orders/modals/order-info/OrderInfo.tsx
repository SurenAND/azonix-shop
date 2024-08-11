import {
  useGetOrderById,
  useUpdateOrder,
} from '@/src/api/orders/orders.queries';
import MyButton from '@/src/components/shared/button/Button';
import OrderedProduct from '@/src/components/templates/dashboard/orders/modals/order-info/ordered-product/OrderedProduct';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

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
  const { mutate: updateOrder } = useUpdateOrder();
  const { data: oldOrder } = useGetOrderById(infoId);

  const deliveredData = () => {
    if (oldOrder) {
      updateOrder(
        {
          newOrder: oldOrder.data.order,
          data: {
            deliveryStatus: true,
            deliveryDate: new Date().toISOString(),
          },
        },
        {
          onSuccess: (data) => {
            if (data.status === 'success') {
              onClose();
              setInfoId('');
              toast.success(t('delivered-success'));
            }
          },
        },
      );
    }
  };

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
        className={`relative flex max-h-[95vh] w-2/3 flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-6 text-start shadow transition-all dark:bg-gray-800 lg:w-1/2 ${
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
        {oldOrder ? (
          <div className='mx-auto flex w-full max-w-xl flex-col gap-4 p-4'>
            <p>
              {t('customer-name')} : {oldOrder?.data.order.user.firstname}{' '}
              {oldOrder?.data.order.user.lastname}
            </p>
            <p>
              {t('address')} : {oldOrder?.data.order.user.address}
            </p>
            <p>
              {t('phone')} : {oldOrder?.data.order.user.phoneNumber}
            </p>
            <p>
              {t('delivery-time')} :{' '}
              {new Date(oldOrder?.data.order.createdAt).toLocaleDateString(
                'EN',
              )}
            </p>
            <p>
              {t('order-time')} :{' '}
              {new Date(oldOrder?.data.order.createdAt).toLocaleDateString(
                'EN',
              )}
            </p>
            <OrderedProduct products={oldOrder?.data.order.products} />
            <div className='mx-auto flex w-1/2 justify-center'>
              {oldOrder?.data.order.deliveryStatus ? (
                <p>
                  {t('delivery-time')} :
                  {new Date(
                    oldOrder?.data.order.deliveryDate,
                  ).toLocaleDateString('EN')}
                </p>
              ) : (
                <MyButton
                  text={t('delivered')}
                  bgColor='bg-axGreen'
                  textColor='text-white'
                  handler={deliveredData}
                />
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default OrderInfoPopup;
