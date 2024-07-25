import {
  useGetCategories,
  useGetSubCategories,
} from '@/src/api/category/category.queries';
import { useGetProducts } from '@/src/api/product/product.queries';
import { ChangeEvent, MouseEvent, useState } from 'react';
import Nav from './nav/Nav';
import Products from './products/Products';
import Sidebar from './sidebar/Sidebar';
import SubCategories from './sub-categories/SubCategories';

const ShopTemplate = () => {
  // sidebar open state
  const [open, setOpen] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [selectedMinPrice, setSelectedMinPrice] = useState<number | undefined>(
    undefined,
  );
  const [selectedMaxPrice, setSelectedMaxPrice] = useState<number | undefined>(
    undefined,
  );

  // get categories
  const { data: categories } = useGetCategories();

  // get sub categories
  const { data: subCategories } = useGetSubCategories({
    category: selectedCategory,
  });

  // get products
  const [page, setPage] = useState(1);
  const { data: products } = useGetProducts({
    page,
    limit: 12,
    category: selectedCategory,
    subcategory: selectedSubCategory,
    minPrice: selectedMinPrice,
    maxPrice: selectedMaxPrice,
  });

  // ----------- Input Filter -----------
  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  // ----------- Radio Filtering -----------
  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedSubCategory('');
    setSelectedCategory(event.target.value);
    setPage(1);
  };

  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.split('-');
    setSelectedMinPrice(+value[0]);
    setSelectedMaxPrice(+value[1]);
    setPage(1);
  };

  // ------------ Button Filtering -----------
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    const target = event.target as HTMLButtonElement;
    setSelectedSubCategory(target.value);
    setPage(1);
  };

  return (
    <div className='min-h-screen overflow-y-hidden bg-white duration-200 dark:bg-gray-900 dark:text-white'>
      <div className='flex'>
        <Sidebar
          handleCategoryChange={handleCategoryChange}
          handlePriceChange={handlePriceChange}
          productCategory={categories?.data.categories || []}
          toggleSidebar={setOpen}
          open={open}
        />
        <div
          className={`w-full bg-gray-100 transition-all dark:bg-gray-500 ${
            open
              ? 'ms-[-250px] duration-[225ms] ease-out md:ms-0 md:w-[calc(100%_-_270px)]'
              : 'ms-[-275px] duration-[195ms] ease-in'
          } overflow-hidden`}
        >
          <Nav query={query} handleInputChange={handleInputChange} />
          <SubCategories
            handleClick={handleClick}
            show={selectedCategory === '' ? false : true}
            subCategories={subCategories?.data.subcategories || []}
          />
          <Products
            products={products?.data.products || []}
            totalPages={products?.total_pages || 1}
            page={page}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopTemplate;
