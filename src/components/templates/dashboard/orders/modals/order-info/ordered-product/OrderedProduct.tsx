import { OrderType } from '@/src/api/orders/orders.type';
import { useTranslation } from 'react-i18next';

type OrderedProductProps = {
  products: OrderType['products'];
};
const OrderedProduct = ({ products }: OrderedProductProps) => {
  const { t, i18n } = useTranslation();
  return (
    <div className='max-h-52 overflow-y-auto'>
      <table className='w-full border-collapse self-start rounded border text-center'>
        <thead className='select-none'>
          <tr className='mb-4 flex flex-col bg-gray-500 text-white dark:text-black sm:table-row'>
            <th className='text-md hidden w-full border px-1 py-3 md:table-cell md:w-[25%]'>
              {t('product-image')}
            </th>
            <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
              {t('product-name')}
            </th>
            <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
              {t('quantity')}
            </th>
            <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
              {t('price')}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => {
            return (
              <tr
                key={product._id}
                className={`mb-4 flex flex-col sm:table-row ${
                  Math.floor(index % 2) !== 0 ? 'bg-gray-400 text-white' : ''
                } ${Math.floor(index % 2) !== 0 ? 'dark:text-black' : ''}`}
              >
                <td className='hidden border p-1 md:table-cell'>
                  <div className='flex select-none justify-center'>
                    <img
                      src={`http://${product.product.images[0]}`}
                      alt={product.product.name}
                      className='max-w-[2rem] rounded bg-white/90 sm:max-w-[3rem]'
                    />
                  </div>
                </td>
                <td className='truncate border p-1'>{product.product.name}</td>
                <td className='truncate border p-1'>
                  <span> {product.count.toLocaleString(i18n.language)}</span>
                </td>
                <td className='truncate border p-1'>
                  {product.product.price.toLocaleString(i18n.language)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default OrderedProduct;
