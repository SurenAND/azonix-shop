import {
  useGetProducts,
  useUpdateProduct,
} from '@/src/api/product/product.queries';
import { ProductType } from '@/src/api/product/product.type';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Pagination from '@/src/components/shared/pagination/Pagination';
import InventoryTable from '@/src/components/templates/dashboard/products-management/inventory/inventory-table/InventoryTable';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

function Inventory() {
  const { t, i18n } = useTranslation();

  const [page, setPage] = useState(1);
  const [hasEditItem, setHasEditItem] = useState(false);
  const [editedProducts, setEditedProducts] = useState<ProductType[]>([]);
  const [editMode, setEditMode] = useState('doing');

  const { data: products, refetch } = useGetProducts({
    page,
    limit: 20,
  });
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    refetch();
  }, [page]);

  const containEditItem = (status: boolean) => {
    setHasEditItem(status);
    if (status) {
      setEditMode('doing');
    }
  };

  const editHandler = () => {
    editedProducts.forEach((item) => {
      updateProduct({
        newProduct: item,
        data: {
          price: item.price,
          quantity: item.quantity,
          discountPercentage: item.discountPercentage,
        },
      });
    });
    setEditMode('done');
    toast.success(t('changes-saved'));
  };

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      <header className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>{t('inventory')}</h1>
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
      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {products &&
        products.status === 'success' &&
        products.data.products.length === 0 ? (
          <EmptyList />
        ) : (
          <InventoryTable
            list={products?.data.products || []}
            onContainEditItem={containEditItem}
            editedProducts={editedProducts}
            setEditedProducts={setEditedProducts}
            editMode={editMode}
          />
        )}
      </div>
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
