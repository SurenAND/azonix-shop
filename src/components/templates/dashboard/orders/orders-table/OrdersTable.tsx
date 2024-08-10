import { OrderType } from '@/src/api/orders/orders.type';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { BsClipboard2CheckFill } from 'react-icons/bs';

type OrdersTableProps = {
  list: OrderType[];
  onFilteredList: (e: string) => void;
  setInfoId: Dispatch<SetStateAction<string>>;
  setOpenInfo: Dispatch<SetStateAction<boolean>>;
  isDelivered: boolean;
};

const OrdersTable = ({
  list,
  onFilteredList,
  setInfoId,
  setOpenInfo,
  isDelivered,
}: OrdersTableProps) => {
  const { t } = useTranslation();

  const showOrdersInfo = (id: string) => {
    setInfoId(id);
    setOpenInfo(true);
  };

  return (
    <table className='w-full border-collapse self-start rounded border text-center'>
      <thead className='select-none'>
        <tr className='mb-4 flex flex-col bg-gray-500 text-white dark:text-black sm:table-row'>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            {t('user-name')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
            {t('total-price')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            <select
              name='time'
              className='w-full bg-gray-500 text-center outline-none'
              onChange={(e) => onFilteredList(e.target.value)}
            >
              <option className='hidden'>
                {isDelivered ? t('delivery-time') : t('order-time')}
              </option>
              <option value='desc'>{t('newest')}</option>
              <option value='asc'>{t('oldest')}</option>
            </select>
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            {t('review')}
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: OrderType, index: number) => {
          return (
            <tr
              key={item._id}
              className={`mb-4 flex flex-col sm:table-row ${
                Math.floor(index % 2) !== 0 ? 'bg-gray-400 text-white' : ''
              } ${Math.floor(index % 2) !== 0 ? 'dark:text-black' : ''}`}
            >
              <td className='truncate border p-1'>
                {item?.user.firstname} {item?.user.lastname}
              </td>
              <td className='truncate border p-1'>
                {item.totalPrice.toFixed(2)}
              </td>
              <td className='truncate border p-1'>
                {new Date(item.deliveryDate).toLocaleDateString('en')}
              </td>
              <td className='truncate border p-1'>
                <div className='flex justify-center'>
                  <BsClipboard2CheckFill
                    width='20'
                    color='#525252'
                    className='cursor-pointer'
                    onClick={() => showOrdersInfo(item._id)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default OrdersTable;
