import {
  useGetCategories,
  useGetSubCategories,
} from '@/src/api/category/category.queries';
import { useGetProducts } from '@/src/api/product/product.queries';
import Products from '@/src/components/shared/products/Products';
import SubCategories from '@/src/components/shared/sub-categories/SubCategories';
import { MainRoutes } from '@/src/constant/routes';
import { useRouter } from 'next/router';
import { MouseEvent, useState } from 'react';

type CategoryTemplateProps = {
  category: string;
};
const CategoryTemplate = ({ category }: CategoryTemplateProps) => {
  const { push: pushRouter } = useRouter();
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  // get categories
  const { data: categories } = useGetCategories({ slugname: category });
  // get products
  const [page, setPage] = useState(1);
  const { data: products } = useGetProducts({
    page,
    limit: 9,
    category: categories?.data.categories[0]._id,
    subcategory: selectedSubCategory,
  });

  // get sub categories
  const { data: subCategories } = useGetSubCategories({
    category: categories?.data.categories[0]._id,
  });

  // ------------ Button Filtering -----------
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    setSelectedSubCategory(target.value);
    setPage(1);
  };

  if (categories && categories?.status !== 'success') {
    pushRouter(MainRoutes.NOTFOUND);
  }

  return (
    <div className='mx-auto my-20 flex max-w-6xl flex-col gap-10'>
      <h2 className='mx-20 border-b-2 border-gray-400 pb-5 text-center text-5xl font-bold uppercase'>
        {categories?.data.categories[0].name}
      </h2>
      <div className='flex justify-center text-center'>
        <SubCategories
          handleClick={handleClick}
          show={true}
          subCategories={subCategories?.data.subcategories || []}
        />
      </div>
      <Products
        products={products?.data.products || []}
        totalPages={products?.total_pages || 1}
        page={page}
        setPage={setPage}
      />
    </div>
  );
};

export default CategoryTemplate;
