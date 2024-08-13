import { useTranslation } from 'react-i18next';

const LegalNotice = () => {
  // libraries
  const { t } = useTranslation();

  return (
    <div className='flex h-[75vh] w-full flex-col items-center p-2'>
      <h1 className='mt-1 p-5 text-3xl font-light'>{t('legal-notice')}</h1>

      {[1, 2, 3, 4].map((num) => (
        <div key={num} className='mt-8 w-full max-w-3xl'>
          <h2 className='mb-2 text-xl font-light'>
            {num}. {t('terms-of-use')}
          </h2>
          <p className='mb-2 text-sm font-light'>
            {t('terms-of-use-description')}
          </p>
        </div>
      ))}
    </div>
  );
};

export default LegalNotice;
