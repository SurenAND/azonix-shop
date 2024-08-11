import {
  useGetProducts,
  useUpdateProduct,
} from '@/src/api/product/product.queries';
import { ProductType } from '@/src/api/product/product.type';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Pagination from '@/src/components/shared/pagination/Pagination';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

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
  const [page, setPage] = useState<number>(1);
  const [hasEditItem, setHasEditItem] = useState<boolean>(false);
  const [editedProducts, setEditedProducts] = useState<
    Record<string, Partial<ProductType>>
  >({});
  const [editMode, setEditMode] = useState<string>('doing');

  // queries
  const { data: products, refetch } = useGetProducts({
    page,
    limit: 15,
  });

  // mutations
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    refetch();
  }, [page]);

  // functions
  const containEditItem = (status: boolean) => {
    setHasEditItem(status);
    if (status) {
      setEditMode('doing');
    }
  };

  const editHandler = () => {
    Object.entries(editedProducts).forEach(([productId, changes]) => {
      updateProduct({
        productId,
        data: {
          price: changes.price,
          quantity: changes.quantity,
          discountPercentage: changes.discountPercentage,
        },
      });
    });
    setEditMode('done');
    setEditedProducts({}); // Clear edited products after update
    toast.success(t('changes-saved'));
  };

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
          disabled={!hasEditItem}
        >
          {t('save')}
        </button>
      </header>

      {/* Table */}
      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {products &&
        products.status === 'success' &&
        products.data.products.length === 0 ? (
          <EmptyList />
        ) : (
          <Suspense fallback={<div>{t('loading')}</div>}>
            <InventoryTable
              list={products?.data.products || []}
              onContainEditItem={containEditItem}
              editedProducts={editedProducts}
              setEditedProducts={setEditedProducts}
              editMode={editMode}
            />
          </Suspense>
        )}
      </div>

      {/* Pagination */}
      {products && (
        <Pagination
          page={page}
          totalPages={products.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
    </main>
  );
}

export default Inventory;
