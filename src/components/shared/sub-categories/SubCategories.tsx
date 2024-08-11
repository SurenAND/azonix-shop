import { SubCategoryType } from '@/src/api/category/category.type';
import { useTranslation } from 'react-i18next';

type SubCategoriesProps = {
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  show: boolean;
  subCategories: SubCategoryType[];
};

const SubCategories = ({
  handleClick,
  show,
  subCategories,
}: SubCategoriesProps) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={show ? 'block' : 'hidden'}>
        <h2 className='my-5 ms-14 text-xl'>{t('product-sub-category')}</h2>
        <div className='ms-14 flex gap-5'>
          <button
            onClick={handleClick}
            value=''
            className='cursor-pointer rounded-md border border-gray-300 bg-transparent px-5 py-3 text-gray-800 dark:text-gray-200'
          >
            {t('all')}
          </button>
          {subCategories?.map((subCategory) => (
            <button
              key={subCategory._id}
              onClick={handleClick}
              value={subCategory._id}
              className='cursor-pointer rounded-md border border-gray-300 bg-transparent px-5 py-3 text-gray-800 dark:text-gray-200'
            >
              {subCategory.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubCategories;
