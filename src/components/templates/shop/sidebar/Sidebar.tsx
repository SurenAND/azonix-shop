import { CategoryType } from '@/src/api/category/category.type';
import Category from '@/src/components/templates/shop/sidebar/category/Category';
import Price from '@/src/components/templates/shop/sidebar/price/Price';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import PriceSorting from './price-sorting/PriceSorting';

type SidebarProps = {
  handleCategoryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceSortingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productCategory: CategoryType[];
  toggleSidebar: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

const Sidebar = ({
  handleCategoryChange,
  handlePriceChange,
  handlePriceSortingChange,
  productCategory,
  toggleSidebar,
  open,
}: SidebarProps) => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <section
        className={`relative z-50 flex h-auto w-[270px] shrink-0 transform flex-col gap-28 border-e-2 border-gray-300 bg-gray-200 px-10 py-20 transition-transform duration-200 dark:border-gray-400 dark:bg-gray-700 dark:text-white ${
          open
            ? 'translate-x-0'
            : i18n.dir() === 'ltr'
              ? '-translate-x-full'
              : 'translate-x-full'
        }`}
      >
        <h2 className='border-b-2 border-gray-400 pb-5 text-center text-5xl font-bold uppercase'>
          {t('filters')}
        </h2>

        <Category
          handleChange={handleCategoryChange}
          productCategory={productCategory}
        />
        <Price handleChange={handlePriceChange} />
        <PriceSorting handleChange={handlePriceSortingChange} />
        {/* toggle sidebar */}
        <button
          onClick={() => toggleSidebar((prev) => !prev)}
          className='absolute -end-10 top-7 flex w-10 items-center justify-center gap-2 rounded-e-full bg-gray-300 py-5 text-gray-500'
        >
          {open ? (
            i18n.dir() === 'ltr' ? (
              <FaChevronLeft className='h-4 w-4' />
            ) : (
              <FaChevronRight className='h-4 w-4' />
            )
          ) : i18n.dir() === 'ltr' ? (
            <FaChevronRight className='h-4 w-4' />
          ) : (
            <FaChevronLeft className='h-4 w-4' />
          )}
        </button>
      </section>
    </>
  );
};

export default Sidebar;
