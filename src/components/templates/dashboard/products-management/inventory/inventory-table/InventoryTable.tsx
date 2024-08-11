import { ProductType } from '@/src/api/product/product.type';
import EditableTd from '@/src/components/shared/editable-td/EditableTd';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type InventoryTableProps = {
  list: ProductType[];
  onContainEditItem: (a: boolean) => void;
  editedProducts: Record<string, Partial<ProductType>>;
  setEditedProducts: Dispatch<
    SetStateAction<Record<string, Partial<ProductType>>>
  >;
  editMode: string;
};

function InventoryTable({
  list,
  onContainEditItem,
  editedProducts,
  setEditedProducts,
  editMode,
}: InventoryTableProps) {
  const { t } = useTranslation();

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setProducts(list);
  }, [list]);

  // reset lists for changing colorful background
  useEffect(() => {
    if (editMode === 'done') {
      setEditedProducts({});
    }
  }, [editMode]);

  useEffect(() => {
    if (Object.keys(editedProducts).length > 0) {
      onContainEditItem(true);
    } else {
      onContainEditItem(false);
    }
  }, [editedProducts]);

  return (
    <table className='w-full border-collapse self-start rounded border text-center'>
      <thead className='select-none'>
        <tr className='mb-4 flex flex-col bg-gray-500 text-white dark:text-black sm:table-row'>
          <th className='text-md w-full border px-1 py-3 md:w-[40%]'>
            {t('product')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            {t('price-with-discount')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            {t('price')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            {t('quantity')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            {t('discount')}
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
              <td className='truncate border p-1'>{product.name}</td>
              <td className='truncate border p-1'>
                {product.priceAfterDiscount.toFixed(2)}
              </td>
              <EditableTd
                product={product}
                editedProducts={editedProducts}
                setEditedProducts={setEditedProducts}
                field='price'
              />
              <EditableTd
                product={product}
                editedProducts={editedProducts}
                setEditedProducts={setEditedProducts}
                field='quantity'
              />
              <EditableTd
                product={product}
                editedProducts={editedProducts}
                setEditedProducts={setEditedProducts}
                field='discountPercentage'
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default InventoryTable;
