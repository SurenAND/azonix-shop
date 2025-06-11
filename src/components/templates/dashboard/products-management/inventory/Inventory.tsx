import { ProductType } from '@/src/api/product/product.type';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Pagination from '@/src/components/shared/pagination/Pagination';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { useProductStore } from '@/src/store/product/product.store'; // Added

const InventoryTable = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/products-management/inventory/inventory-table/InventoryTable'
    ),
);

function Inventory() {
  // libraries
  const { t, i18n } = useTranslation();

  // states
  const [localPage, setLocalPage] = useState<number>(1); // Renamed to avoid conflict with store's page
  const [hasEditItem, setHasEditItem] = useState<boolean>(false);
  const [editedProducts, setEditedProducts] = useState<
    Record<string, Partial<ProductType>>
  >({});
  const [editMode, setEditMode] = useState<string>('doing');

  // Zustand Store
  const {
    fetchAllProducts,
    updateProduct, // Renamed from storeUpdateProduct for direct use
    displayedProducts,
    currentPage,
    totalPages,
    loading,
    error,
  } = useProductStore((state) => ({
    fetchAllProducts: state.fetchAllProducts,
    updateProduct: state.updateProduct,
    displayedProducts: state.displayedProducts,
    currentPage: state.currentPage,
    totalPages: state.totalPages,
    loading: state.loading,
    error: state.error,
  }));

  useEffect(() => {
    fetchAllProducts({ page: localPage, limit: 15 });
  }, [localPage, fetchAllProducts]);

  // functions
  const containEditItem = (status: boolean) => {
    setHasEditItem(status);
    if (status) {
      setEditMode('doing');
    }
  };

  const editHandler = () => {
    Object.entries(editedProducts).forEach(([productId, changes]) => {
      // Ensure only valid fields are passed for update, matching Partial<ProductType>
      const updateData: Partial<ProductType> = {};
      if (changes.price !== undefined) updateData.price = changes.price;
      if (changes.quantity !== undefined) updateData.quantity = changes.quantity;
      if (changes.discountPercentage !== undefined) updateData.discountPercentage = changes.discountPercentage;
      // Add other editable fields here if necessary, e.g. name, description, brand
      // Note: slugname and priceAfterDiscount are handled by the store's updateProduct action.

      if (Object.keys(updateData).length > 0) {
        updateProduct(productId, updateData);
      }
    });
    setEditMode('done');
    setEditedProducts({}); // Clear edited products after update
    toast.success(t('changes-saved'));
    // Optionally, re-fetch to see if sorting/filtering by updated values changes the view
    // fetchAllProducts({ page: localPage, limit: 15 });
  };

  if (loading && displayedProducts.length === 0) {
    return <div className='min-h-screen w-full p-3 md:w-[780px] text-center'>{t('loading')}...</div>;
  }

  if (error) {
    return <div className='min-h-screen w-full p-3 md:w-[780px] text-center text-red-500'>{t('error')}: {error}</div>;
  }

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      <header className='flex items-center justify-between'>
        {/* Title */}
        <h1 className='text-lg font-bold'>{t('inventory')}</h1>

        {/* Save Button */}
        <button
          className={`mt-2 rounded-lg bg-axLightPurple px-7 py-2 text-xs font-semibold uppercase text-white hover:bg-axDarkPurple disabled:opacity-50 ${
            i18n.dir() === 'ltr' ? 'tracking-wide' : ''
          }`}
          onClick={editHandler}
          disabled={!hasEditItem || loading} // Disable if loading
        >
          {t('save')}
        </button>
      </header>

      {/* Table */}
      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {displayedProducts.length === 0 && !loading ? (
          <EmptyList />
        ) : (
          <Suspense fallback={<div>{t('loading')}</div>}>
            <InventoryTable
              list={displayedProducts} // Use displayedProducts from store
              onContainEditItem={containEditItem}
              editedProducts={editedProducts}
              setEditedProducts={setEditedProducts}
              editMode={editMode}
            />
          </Suspense>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 0 && (
        <Pagination
          page={currentPage} // Use currentPage from store
          totalPages={totalPages} // Use totalPages from store
          OnSetPage={(pageNo) => setLocalPage(pageNo)} // Update localPage, which triggers useEffect
        />
      )}
    </main>
  );
}

export default Inventory;
