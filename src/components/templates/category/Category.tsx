import {
  useGetCategories,
  useGetSubCategories,
} from '@/src/api/category/category.queries';
import { useGetProducts } from '@/src/api/product/product.queries';
import ProductSkeleton from '@/src/components/shared/skeletons/product-skeleton/ProductSkeleton';
import SubCategorySkeleton from '@/src/components/shared/skeletons/sub-category-skeleton/SubCategorySkeleton';
import { MainRoutes } from '@/src/constant/routes';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { MouseEvent, useEffect, useMemo } from 'react';

// Dynamic load components
const Products = dynamic(
  () => import('@/src/components/shared/products/Products'),
  { loading: () => <ProductSkeleton /> },
);
const SubCategories = dynamic(
  () => import('@/src/components/shared/sub-categories/SubCategories'),
  { loading: () => <SubCategorySkeleton /> },
);

type CategoryTemplateProps = {
  categorySlug: string;
};

const CategoryTemplate = ({ categorySlug }: CategoryTemplateProps) => {
  // libraries
  const { push: pushRouter } = useRouter();
  const searchParams = useSearchParams();

  // search params
  const page = searchParams.get('p') || '1';
  const subcategory = searchParams.get('sc') || '';
  const params = new URLSearchParams(searchParams);

  // get categories
  const { data: categories, refetch: refetchCategories } = useGetCategories({
    slugname: categorySlug,
  });
  useEffect(() => {
    refetchCategories();
  }, [categorySlug, refetchCategories]);

  // get sub categories
  const { data: subCategories, isFetching: subCategoryFetching } =
    useGetSubCategories({
      category: categories?.data.categories[0]?._id,
    });

  // get products
  const newParams = useMemo(
    () => ({
      page: +page,
      limit: 9,
      category: categories?.data.categories[0]._id,
      subcategory,
    }),
    [page, categories, subcategory],
  );
  const {
    data: products,
    isFetching: productFetching,
    refetch,
  } = useGetProducts(newParams);

  // refetch products
  useEffect(() => {
    refetch();
  }, [newParams]);

  // ------------ Filter by subcategory -----------
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    const value = target.value;
    params.set('sc', value);
    params.set('p', '1');
    pushRouter({
      pathname: '/shop/[category]',
      query: { category: categorySlug, ...Object.fromEntries(params) },
    });
  };

  // ----------- Pagination -----------
  const setPage = (page: number) => {
    params.set('p', page.toString());
    pushRouter({
      pathname: '/shop/[category]',
      query: { category: categorySlug, ...Object.fromEntries(params) },
    });
  };

  // ----------- Redirect to 404 if category not found -----------
  if (categories && categories?.status !== 'success') {
    pushRouter(MainRoutes.NOTFOUND);
  }

  return (
    <div className='mx-auto my-20 flex max-w-6xl flex-col gap-10'>
      {/* ----------- Category title ----------- */}
      <h2 className='mx-20 border-b-2 border-gray-400 pb-5 text-center text-3xl font-bold uppercase sm:text-5xl'>
        {categories?.data.categories[0].name}
      </h2>

      {/* ----------- Subcategories ----------- */}
      <div className='text-center sm:flex sm:justify-center'>
        {!subCategoryFetching ? (
          <SubCategories
            handleClick={handleClick}
            show={true}
            subCategories={subCategories?.data.subcategories || []}
          />
        ) : (
          <SubCategorySkeleton />
        )}
      </div>

      {/* ----------- Products ----------- */}
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
  );
};

export default CategoryTemplate;
