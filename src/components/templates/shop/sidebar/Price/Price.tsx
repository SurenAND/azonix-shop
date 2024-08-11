import { useTranslation } from 'react-i18next';

type PriceProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Price = ({ handleChange }: PriceProps) => {
  // libraries
  const { t } = useTranslation();

  return (
    <div>
      <h2 className='mb-5 text-2xl font-bold'>{t('product-price')}</h2>

      <div className='ms-5 flex flex-col gap-2'>
        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value=''
            name='price'
            defaultChecked
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          {t('all')}
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='0-50'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          $0 - $50
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='50-100'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          $50 - $100
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='100-500'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          $100 - $500
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='500-1000'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          $500 - $1000
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='1000-2000'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          $1000 - $2000
        </label>

        <label className='group relative mb-3 block cursor-pointer select-none ps-9'>
          <input
            className='peer absolute cursor-pointer opacity-0'
            onChange={handleChange}
            type='radio'
            value='2000'
            name='price'
          />
          <span className="after:none absolute start-0 top-0 h-5 w-5 rounded-full bg-white after:absolute after:start-[6.4px] after:top-[6.4px] after:h-2 after:w-2 after:rounded-full after:bg-white after:content-[''] peer-checked:bg-axLightPurple peer-checked:after:block"></span>
          {t('over')} $2000
        </label>
      </div>
    </div>
  );
};

export default Price;
