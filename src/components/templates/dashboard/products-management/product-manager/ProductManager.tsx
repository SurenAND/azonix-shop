import {
  useDeleteProduct,
  useGetProducts,
} from '@/src/api/product/product.queries';
import Pagination from '@/src/components/shared/pagination/Pagination';
import { ProductsTable } from '@/src/components/templates/dashboard/products-management/product-manager/product-table/ProductTable';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const AddPopUp = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/modals/add/Add'
    ),
);
const DeletePopUp = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/modals/delete/Delete'
    ),
);
const EditPopUp = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/modals/edit/Edit'
    ),
);

function ProductManager() {
  const { t, i18n } = useTranslation();
  const [page, setPage] = useState(1);
  const [productCategory, setProductCategory] = useState('');
  const { data: products, refetch } = useGetProducts({
    page,
    category: productCategory,
  });

  const { mutate: deleteProduct } = useDeleteProduct();

  const [openDelete, setOpenDelete] = useState(false);
  const idToDelete = useRef<string>('');

  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState<string>('');

  const [openAdd, setOpenAdd] = useState(false);

  const filteredList = (id: string) => {
    setProductCategory(id);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success(t('product-delete-success'));
  };

  useEffect(() => {
    refetch();
  }, [page, productCategory]);

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      <header className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>{t('product-manager')}</h1>
        <button
          className={`mt-2 rounded-lg bg-axLightPurple px-7 py-2 text-xs font-semibold uppercase text-white hover:bg-axDarkPurple ${
            i18n.dir() === 'ltr' ? 'tracking-wide' : ''
          }`}
          onClick={() => setOpenAdd(true)}
        >
          {t('add-product')}
        </button>
      </header>
      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        <ProductsTable
          list={products?.data.products || []}
          onFilteredList={filteredList}
          idToDelete={idToDelete}
          setOpenDelete={setOpenDelete}
          setIdToEdit={setIdToEdit}
          setOpenEdit={setOpenEdit}
        />
      </div>
      {products && (
        <Pagination
          page={page}
          totalPages={products.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        {openDelete && (
          <DeletePopUp
            openDelete={openDelete}
            onClose={() => setOpenDelete(false)}
            action={() => handleDelete(idToDelete.current)}
            idToDelete={idToDelete.current}
          />
        )}
        {openEdit && (
          <EditPopUp
            openEdit={openEdit}
            onClose={() => setOpenEdit(false)}
            idToEdit={idToEdit}
            setIdToEdit={setIdToEdit}
          />
        )}
        {openAdd && (
          <AddPopUp openAdd={openAdd} onClose={() => setOpenAdd(false)} />
        )}
      </Suspense>
    </main>
  );
}

export default ProductManager;
