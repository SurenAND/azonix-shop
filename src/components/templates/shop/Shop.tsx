import ProductSkeleton from '@/src/components/shared/skeletons/product-skeleton/ProductSkeleton';
import ShopSidebarSkeleton from '@/src/components/shared/skeletons/shop-sidebar/ShopSidebarSkeleton';
// import SubCategorySkeleton from '@/src/components/shared/skeletons/sub-category-skeleton/SubCategorySkeleton'; // Subcategory display removed for now
// import SubCategories from '@/src/components/shared/sub-categories/SubCategories'; // Subcategory display removed for now
import Nav from '@/src/components/templates/shop/nav/Nav';
import Sidebar from '@/src/components/templates/shop/sidebar/Sidebar';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useState } from 'react'; // Removed useEffect, useMemo
import type { ProductType } from '@/src/api/product/product.type'; // Assuming ProductType path
import type { CategoryType } from '@/src/api/category/category.type'; // Assuming CategoryType path

// Dynamic import
const Products = dynamic(
  () => import('@/src/components/shared/products/Products'),
  { loading: () => <ProductSkeleton /> },
);

export interface ShopTemplateProps {
  products: ProductType[]; // Changed from API response type to direct ProductType array
  categories: CategoryType[]; // Changed from API response type to direct CategoryType array
  loading: boolean;
  error?: string | null;
  totalPages: number;
  currentPage: number;
}

export default function ShopTemplate({
  products,
  categories,
  loading,
  error,
  totalPages,
  currentPage,
}: ShopTemplateProps) {
  // libraries
  const router = useRouter();
  const searchParams = useSearchParams();

  // states
  const [open, setOpen] = useState<boolean>(true);
  const [query, setQuery] = useState<string>(''); // For Nav search input

  // search params for filter persistence and URL updates - parent page will handle re-fetch
  // const page = searchParams.get('p') || '1'; // Current page now comes from prop
  const categoryParams = searchParams.get('c') || ''; // Renamed to avoid conflict with categories prop
  // const subcategory = searchParams.get('sc') || ''; // Subcategory logic removed for now
  // const minPrice = searchParams.get('min') || ''; // Price filter logic might change
  // const maxPrice = searchParams.get('max') || ''; // Price filter logic might change
  // const sort = searchParams.get('s') || ''; // Sort logic might change
  const params = new URLSearchParams(searchParams);


  // ----------- Input Filter (Nav search) -----------
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    // Actual search/filter based on query would be handled by parent or a different mechanism
  };

  // ----------- filter by category (Sidebar) -----------
  // This function will now just update URL. Parent page needs to listen and refetch.
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    params.set('c', value);
    params.set('p', '1');
    params.delete('sc'); // If subcategories were a thing
    router.push({ query: params.toString() }, undefined, { shallow: true }); // shallow to prevent re-running page's useEffects if not desired
  };

  // ----------- filter by price (Sidebar) -----------
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split('-');
    params.set('min', value[0]);
    params.set('max', value[1]);
    params.set('p', '1');
    router.push({ query: params.toString() }, undefined, { shallow: true });
  };

  // ----------- sort by price (Sidebar) -----------
  const handlePriceSortingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    params.set('s', value);
    params.set('p', '1');
    router.push({ query: params.toString() }, undefined, { shallow: true });
  };

  // ------------ filter by subcategory (Removed for now) -----------
  // const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
  //   const target = event.target as HTMLButtonElement;
  //   const value = target.value;
  //   params.set('sc', value);
  //   params.set('p', '1');
  //   router.push({ query: params.toString() });
  // };

  // ----------- Pagination -----------
  // Parent page should handle totalPages and current page for fetching.
  // This setPage can remain to update URL, parent page listens.
  const setPage = (newPage: number) => {
    params.set('p', newPage.toString());
    router.push({ query: params.toString() }, undefined, { shallow: true });
  };

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  return (
    <div className='min-h-screen overflow-y-hidden bg-white duration-200 dark:bg-gray-900 dark:text-white'>
      <div className='flex'>
        {loading && categories.length === 0 ? ( // Show sidebar skeleton only if categories are also loading
          <ShopSidebarSkeleton />
        ) : (
          <Sidebar
            handleCategoryChange={handleCategoryChange}
            handlePriceChange={handlePriceChange}
            handlePriceSortingChange={handlePriceSortingChange}
            productCategory={categories || []} // Use categories from props
            toggleSidebar={setOpen}
            open={open}
          />
        )}

        <div
          className={`w-full bg-gray-100 transition-all dark:bg-gray-500 ${
            open
              ? 'ms-[-250px] duration-[225ms] ease-out md:ms-0 md:w-[calc(100%_-_270px)]'
              : 'ms-[-275px] duration-[195ms] ease-in'
          } overflow-hidden`}
        >
          <Nav query={query} handleInputChange={handleInputChange} />

          {/* SubCategories section removed for now as it requires its own data fetching or different prop drilling */}
          {/* {loading && !subCategories ? ( <SubCategorySkeleton /> ) : (
            <SubCategories
              handleClick={handleClick} // This was for subcategory selection
              show={categoryParams === '' ? false : true} // categoryParams from URL
              subCategories={subCategories || []} // subCategories would need to be passed as a prop
            />
          )} */}

          {loading && products.length === 0 ? ( // Show product skeleton only if products are also loading
            <ProductSkeleton />
          ) : (
            <Products
              products={products || []} // Use products from props
              totalPages={totalPages}
              page={currentPage}
              setPage={setPage} // setPage will update URL, parent page will refetch and update currentPage prop
            />
          )}
        </div>
      </div>
    </div>
  );
}
