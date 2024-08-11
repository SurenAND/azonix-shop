import {
  useDeleteProduct,
  useGetProducts,
} from '@/src/api/product/product.queries';
import Loading from '@/src/components/shared/loading/Loading';
import Pagination from '@/src/components/shared/pagination/Pagination';
import { ProductsTable } from '@/src/components/templates/dashboard/products-management/product-manager/product-table/ProductTable';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const AddPopUp = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/modals/add/Add'
    ),
);
const DeletePopUp = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/modals/delete/Delete'
    ),
);
const EditPopUp = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/product-manager/modals/edit/Edit'
    ),
);

function ProductManager() {
  // libraries
  const { t, i18n } = useTranslation();

  // states
  const [page, setPage] = useState<number>(1);
  const [productCategory, setProductCategory] = useState<string>('');
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<string>('');
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const idToDelete = useRef<string>('');

  // queries
  const { data: products, refetch } = useGetProducts({
    page,
    category: productCategory,
  });

  // mutations
  const { mutate: deleteProduct } = useDeleteProduct();

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
        {/* product manager title */}
        <h1 className='text-lg font-bold'>{t('product-manager')}</h1>
        {/* add product button */}
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
        {/* products table */}
        <ProductsTable
          list={products?.data.products || []}
          onFilteredList={filteredList}
          idToDelete={idToDelete}
          setOpenDelete={setOpenDelete}
          setIdToEdit={setIdToEdit}
          setOpenEdit={setOpenEdit}
        />
      </div>

      {/* pagination */}
      {products && (
        <Pagination
          page={page}
          totalPages={products.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}

      {/* delete popup */}
      <Suspense fallback={<Loading />}>
        {openDelete && (
          <DeletePopUp
            openDelete={openDelete}
            onClose={() => setOpenDelete(false)}
            action={() => handleDelete(idToDelete.current)}
            idToDelete={idToDelete.current}
          />
        )}

        {/* edit popup */}
        {openEdit && (
          <EditPopUp
            openEdit={openEdit}
            onClose={() => setOpenEdit(false)}
            idToEdit={idToEdit}
            setIdToEdit={setIdToEdit}
          />
        )}

        {/* add product popup */}
        {openAdd && (
          <AddPopUp openAdd={openAdd} onClose={() => setOpenAdd(false)} />
        )}
      </Suspense>
    </main>
  );
}

export default ProductManager;
