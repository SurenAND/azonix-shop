import Loading from '@/src/components/shared/loading/Loading';
import Pagination from '@/src/components/shared/pagination/Pagination';
import { ProductsTable } from '@/src/components/templates/dashboard/products-management/product-manager/product-table/ProductTable';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store'; // For category filter options

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
  const { t, i18n } = useTranslation();

  const [localPage, setLocalPage] = useState<number>(1);
  const [productCategoryId, setProductCategoryId] = useState<string>(''); // Store ID
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<string>('');
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const idToDelete = useRef<string>('');

  const {
    fetchAllProducts,
    deleteProduct: storeDeleteProduct,
    displayedProducts,
    currentPage,
    totalPages,
    loading,
    error, // TODO: Display this error
  } = useProductStore((state) => ({
    fetchAllProducts: state.fetchAllProducts,
    deleteProduct: state.deleteProduct,
    displayedProducts: state.displayedProducts,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loading: state.loading,
    error: state.error,
  }));

  const { categories: allCategories, fetchAllCategories: storeFetchAllCategories } = useCategoryStore((state) => ({
    categories: state.categories,
    fetchAllCategories: state.fetchAllCategories,
  }));

  useEffect(() => {
    if(allCategories.length === 0) {
      storeFetchAllCategories(); // Fetch all categories for filter dropdown
    }
  }, [allCategories, storeFetchAllCategories]);


  useEffect(() => {
    // Fetch products based on localPage and productCategoryId
    // Default limit can be set here or in the store's fetchAllProducts
    fetchAllProducts({ page: localPage, limit: 10, category: productCategoryId || undefined });
  }, [localPage, productCategoryId, fetchAllProducts]);

  const handleCategoryFilterChange = (categoryId: string) => {
    setProductCategoryId(categoryId);
    setLocalPage(1); // Reset to first page when filter changes
  };

  const handleDeleteProduct = (id: string) => {
    storeDeleteProduct(id);
    toast.success(t('product-delete-success'));
    // Re-fetch products for the current page to reflect deletion
    fetchAllProducts({ page: localPage, limit: 10, category: productCategoryId || undefined });
  };

  if (loading && displayedProducts.length === 0) {
    return <div className="text-center p-4">{t('loading')}...</div>;
  }
  if (error) {
    return <div className="text-center p-4 text-red-500">{t('error')}: {error}</div>;
  }

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

      {/* TODO: Add a category filter dropdown here, using `allCategories` and calling `handleCategoryFilterChange` */}
      {/* Example:
      <select onChange={(e) => handleCategoryFilterChange(e.target.value)} value={productCategoryId} className="my-2 p-2 border rounded">
        <option value="">All Categories</option>
        {allCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
      </select>
      */}

      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        <ProductsTable
          list={displayedProducts}
          onFilteredList={handleCategoryFilterChange} // This prop might need renaming if it's just for category
          idToDelete={idToDelete} // For setting which ID to delete via modal
          setOpenDelete={setOpenDelete}
          setIdToEdit={setIdToEdit} // For setting which ID to edit via modal
          setOpenEdit={setOpenEdit}
          // Pass categories for dropdown if ProductsTable renders it
          categoriesForFilter={allCategories}
        />
      </div>

      {totalPages > 0 && (
        <Pagination
          page={currentPage}
          totalPages={totalPages}
          OnSetPage={(pageNo) => setLocalPage(pageNo)}
        />
      )}

      <Suspense fallback={<Loading />}>
        {openDelete && (
          <DeletePopUp
            openDelete={openDelete}
            onClose={() => setOpenDelete(false)}
            action={() => handleDeleteProduct(idToDelete.current)} // Use new handler
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
          // AddPopUp will be refactored next to use stores
          <AddPopUp openAdd={openAdd} onClose={() => setOpenAdd(false)} />
        )}
      </Suspense>
    </main>
  );
}

export default ProductManager;
