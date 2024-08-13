import { CategoryType } from '@/src/api/category/category.type';
import { useTranslation } from 'react-i18next';

type CategoryProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  productCategory: CategoryType[];
};

function Category({ handleChange, productCategory }: CategoryProps) {
  // libraries
  const { t } = useTranslation();

  return (
    <div>
      <h2 className='mb-5 text-2xl font-bold'>{t('product-category')}</h2>

      {/* all products */}
      <div className='ms-5 flex flex-col gap-2'>
        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value=''
            name='category'
            defaultChecked
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          {t('all')}
        </label>

        {/* categories */}
        {productCategory?.map((category) => (
          <label
            key={category?._id}
            className='group relative mb-3 block cursor-pointer select-none ps-9'
          >
            <input
              className='peer absolute cursor-pointer opacity-0'
              onChange={handleChange}
              type='radio'
              value={category?._id}
              name='category'
            />
            <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
            {category?.name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Category;
