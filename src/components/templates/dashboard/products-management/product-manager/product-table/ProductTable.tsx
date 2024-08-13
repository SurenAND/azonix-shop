import { useGetCategories } from '@/src/api/category/category.queries';
import { ProductType } from '@/src/api/product/product.type';
import Image from 'next/image';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdEdit } from 'react-icons/md';

type ProductsTableProps = {
  list: ProductType[];
  onFilteredList: (e: string) => void;
  idToDelete: MutableRefObject<string>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  setIdToEdit: Dispatch<SetStateAction<string>>;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
};

export const ProductsTable = ({
  list,
  onFilteredList,
  idToDelete,
  setOpenDelete,
  setIdToEdit,
  setOpenEdit,
}: ProductsTableProps) => {
  // libraries
  const { t } = useTranslation();

  // queries
  const { data: categories } = useGetCategories();

  // functions
  const setDeleteProductModal = (id: string) => {
    idToDelete.current = id;
    setOpenDelete(true);
  };

  const setEditProductModal = (id: string) => {
    setIdToEdit(id);
    setOpenEdit(true);
  };

  return (
    <table className='w-full border-collapse self-start rounded border text-center'>
      {/* table header */}
      <thead className='select-none'>
        <tr className='mb-4 flex flex-col bg-gray-500 text-white dark:text-black sm:table-row'>
          <th className='text-md hidden w-full border px-1 py-3 md:table-cell md:w-[15%]'>
            {t('product-image')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[55%]'>
            {t('product-name')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            <select
              name='category'
              className='w-full bg-gray-500 text-center outline-none'
              onChange={(e) => onFilteredList(e.target.value)}
            >
              <option value=''>{t('all-category')}</option>
              {categories?.data.categories.map((category) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[15%]'>
            {t('delete-edit')}
          </th>
        </tr>
      </thead>
      {/* table body */}
      <tbody>
        {list?.map((product, index) => {
          return (
            <tr
              key={product._id}
              className={`mb-4 flex flex-col sm:table-row ${
                Math.floor(index % 2) !== 0 ? 'bg-gray-400 text-white' : ''
              } ${Math.floor(index % 2) !== 0 ? 'dark:text-black' : ''}`}
            >
              {/* product image */}
              <td className='hidden border p-1 md:table-cell'>
                <div className='flex select-none justify-center'>
                  <Image
                    src={product?.images[0]}
                    alt={product?.name}
                    width={48}
                    height={48}
                    className='rounded bg-white/90'
                  />
                </div>
              </td>
              {/* product name */}
              <td className='truncate border p-1'>{product?.name}</td>
              {/* product category */}
              <td className='truncate border p-1'>
                {product?.category.name}/{product?.subcategory.name}
              </td>
              {/* delete and edit button */}
              <td className='border p-1'>
                <div className='flex select-none items-center justify-center gap-4'>
                  <MdDelete
                    className='w-5 cursor-pointer'
                    onClick={() => setDeleteProductModal(product?._id)}
                  />
                  <MdEdit
                    className='w-5 cursor-pointer'
                    onClick={() => setEditProductModal(product?._id)}
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
