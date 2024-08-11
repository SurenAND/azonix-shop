import { useTranslation } from 'react-i18next';

type NavPropsType = {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

const Nav = ({ handleInputChange, query }: NavPropsType) => {
  // libraries
  const { t } = useTranslation();

  return (
    <div className='z-50 ms-8 flex items-center justify-between gap-5 border-b-2 border-gray-300 p-5 dark:border-gray-400'>
      <div className='w-full'>
        <input
          className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:border-axLightPurple focus:outline-none'
          type='text'
          // onChange={handleInputChange}
          value={query}
          placeholder={t('search-for-products')}
        />
      </div>
    </div>
  );
};

export default Nav;
