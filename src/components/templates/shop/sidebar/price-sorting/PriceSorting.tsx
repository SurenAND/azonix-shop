import { useTranslation } from 'react-i18next';

type PriceSortingProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const PriceSorting = ({ handleChange }: PriceSortingProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className='mb-5 text-2xl font-bold'>{t('product-sort-by-price')}</h2>

      <div className='ms-5 flex flex-col gap-2'>
        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='priceAfterDiscount'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          {t('low-to-high')}
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='-priceAfterDiscount'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          {t('high-to-low')}
        </label>
      </div>
    </div>
  );
};

export default PriceSorting;
