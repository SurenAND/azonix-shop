import {
  useGetCategories,
  useGetSubCategories,
} from '@/src/api/category/category.queries';
import { useGetProducts } from '@/src/api/product/product.queries';
import ProductSkeleton from '@/src/components/shared/skeletons/product-skeleton/ProductSkeleton';
import ShopSidebarSkeleton from '@/src/components/shared/skeletons/shop-sidebar/ShopSidebarSkeleton';
import SubCategorySkeleton from '@/src/components/shared/skeletons/sub-category-skeleton/SubCategorySkeleton';
import SubCategories from '@/src/components/shared/sub-categories/SubCategories';
import Nav from '@/src/components/templates/shop/nav/Nav';
import Sidebar from '@/src/components/templates/shop/sidebar/Sidebar';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useEffect, useMemo, useState } from 'react';

// Dynamic import
const Products = dynamic(
  () => import('@/src/components/shared/products/Products'),
  {
    ssr: true,
  },
);

export default function ShopTemplate() {
  // sidebar open state
  const [open, setOpen] = useState(true);

  // search params
  const searchParams = useSearchParams();
  const page = searchParams.get('p') || '1';
  const category = searchParams.get('c') || '';
  const subcategory = searchParams.get('sc') || '';
  const minPrice = searchParams.get('min') || '';
  const maxPrice = searchParams.get('max') || '';
  const sort = searchParams.get('s') || '';

  // router
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  // get categories
  const { data: categories, isFetching: categoryFetching } = useGetCategories();

  // get sub categories
  const { data: subCategories, isFetching: subCategoryFetching } =
    useGetSubCategories({
      category,
    });

  const newParams = useMemo(
    () => ({
      page: +page,
      limit: 12,
      category,
      subcategory,
      minPrice: +minPrice,
      maxPrice: +maxPrice,
      sort,
    }),
    [page, category, subcategory, minPrice, maxPrice, sort],
  );

  const {
    data: products,
    isFetching: productFetching,
    refetch,
  } = useGetProducts(newParams);

  useEffect(() => {
    refetch();
  }, [newParams, refetch]);

  // ----------- Input Filter -----------
  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
  };

  // ----------- Radio Filtering -----------
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    params.set('c', value);
    params.set('p', '1');
    params.delete('sc');
    router.push({ query: params.toString() });
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split('-');
    params.set('min', value[0]);
    params.set('max', value[1]);
    params.set('p', '1');
    router.push({ query: params.toString() });
  };

  const handlePriceSortingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    params.set('s', value);
    params.set('p', '1');
    router.push({ query: params.toString() });
  };

  // ------------ Button Filtering -----------
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.value;
    params.set('sc', value);
    params.set('p', '1');
    router.push({ query: params.toString() });
  };

  // ----------- Pagination -----------
  const setPage = (page: number) => {
    params.set('p', page.toString());
    router.push({ query: params.toString() });
  };

  return (
    <div className='min-h-screen overflow-y-hidden bg-white duration-200 dark:bg-gray-900 dark:text-white'>
      <div className='flex'>
        {!categoryFetching ? (
          <Sidebar
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            handlePriceSortingChange={handlePriceSortingChange}
            productCategory={categories?.data.categories || []}
            toggleSidebar={setOpen}
            open={open}
          />
        ) : (
          <ShopSidebarSkeleton />
        )}

        <div
          className={`w-full bg-gray-100 transition-all dark:bg-gray-500 ${
            open
              ? 'ms-[-250px] duration-[225ms] ease-out md:ms-0 md:w-[calc(100%_-_270px)]'
              : 'ms-[-275px] duration-[195ms] ease-in'
          } overflow-hidden`}
        >
          <Nav query={query} handleInputChange={handleInputChange} />

          {!subCategoryFetching ? (
            <SubCategories
              handleClick={handleClick}
              show={category === '' ? false : true}
              subCategories={subCategories?.data.subcategories || []}
            />
          ) : (
            <SubCategorySkeleton />
          )}

          {!productFetching ? (
            <Products
              products={products?.data.products || []}
              totalPages={products?.total_pages || 1}
              page={+page}
              setPage={setPage}
            />
          ) : (
            <ProductSkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
