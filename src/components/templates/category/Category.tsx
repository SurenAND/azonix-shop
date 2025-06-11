import ProductSkeleton from '@/src/components/shared/skeletons/product-skeleton/ProductSkeleton';
import SubCategorySkeleton from '@/src/components/shared/skeletons/sub-category-skeleton/SubCategorySkeleton';
// Note: MainRoutes import might be unnecessary if redirection logic is handled by parent page
// import { MainRoutes } from '@/src/constant/routes';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { MouseEvent } from 'react'; // Removed useEffect, useMemo
import type { ProductType } from '@/src/api/product/product.type';
import type { CategoryType, SubCategoryType } from '@/src/api/category/category.type';

// Dynamic load components
const Products = dynamic(
  () => import('@/src/components/shared/products/Products'),
  { loading: () => <ProductSkeleton /> },
);
const SubCategories = dynamic(
  () => import('@/src/components/shared/sub-categories/SubCategories'),
  { loading: () => <SubCategorySkeleton /> },
);

export interface CategoryTemplateProps {
  categorySlug?: string; // Keep slug for URL generation if needed
  currentCategory: CategoryType | null;
  products: ProductType[];
  subcategories: SubCategoryType[];
  categories: CategoryType[]; // Full list of categories for sidebar/nav (not used in current JSX)
  isLoading: boolean;
  error?: string | null;
  currentPage: number;
  totalPages: number;
}

const CategoryTemplate = ({
  categorySlug,
  currentCategory,
  products,
  subcategories,
  // categories, // Not directly used in this template's JSX structure currently
  isLoading,
  error,
  currentPage,
  totalPages,
}: CategoryTemplateProps) => {
  // libraries
  const { push: pushRouter } = useRouter(); // Renamed to avoid conflict if router object is needed
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  // ------------ Filter by subcategory -----------
  const handleSubcategoryClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.value;
    params.set('sc', value); // 'sc' for subcategory
    params.set('p', '1'); // Reset to page 1 when subcategory changes
    // Parent page listens to URL changes and re-fetches products
    pushRouter(
      {
        pathname: `/shop/${categorySlug}`, // Keep existing category slug in path
        query: Object.fromEntries(params),
      },
      undefined,
      { shallow: true },
    );
  };

  // ----------- Pagination for Products -----------
  const setProductPage = (page: number) => {
    params.set('p', page.toString());
    // Parent page listens to URL changes and re-fetches products
    pushRouter(
      {
        pathname: `/shop/${categorySlug}`,
        query: Object.fromEntries(params),
      },
      undefined,
      { shallow: true },
    );
  };

  // TODO: Add controls for other filters like price, sort if needed.
  // These would similarly update URL params for the parent page to handle.

  if (isLoading && !currentCategory) {
    // Initial load, showing full page skeleton might be too much if some data is there
    // For now, a simple loading text or rely on individual component skeletons
    return (
      <div className='mx-auto my-20 flex max-w-6xl flex-col gap-10 text-center'>
        Loading category details...
        <SubCategorySkeleton />
        <ProductSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-8">Error: {error}</div>;
  }

  if (!currentCategory) {
    // This case should be handled by the parent page (e.g. redirect to 404)
    // Or if parent passes loading=false and no currentCategory, then it's truly not found
    return <div className="text-center p-8">Category not found.</div>;
  }

  return (
    <div className='mx-auto my-20 flex max-w-6xl flex-col gap-10'>
      {/* ----------- Category title ----------- */}
      <h2 className='mx-20 border-b-2 border-gray-400 pb-5 text-center text-5xl font-bold uppercase'>
        {currentCategory.name}
      </h2>

      {/* ----------- Subcategories ----------- */}
      {isLoading && subcategories.length === 0 ? (
        <SubCategorySkeleton />
      ) : subcategories.length > 0 ? (
        <div className='flex justify-center text-center'>
          <SubCategories
            handleClick={handleSubcategoryClick}
            show={true} // Always show if available for this category page
            subCategories={subcategories}
          />
        </div>
      ) : null /* No subcategories to display */}

      {/* ----------- Products ----------- */}
      {isLoading && products.length === 0 ? (
        <ProductSkeleton />
      ) : (
        <Products
          products={products}
          totalPages={totalPages}
          page={currentPage}
          setPage={setProductPage}
        />
      )}
    </div>
  );
};

export default CategoryTemplate;
