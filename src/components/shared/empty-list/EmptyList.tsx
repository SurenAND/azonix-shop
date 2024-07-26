import { useTranslation } from 'react-i18next';

export const EmptyList = () => {
  const { t } = useTranslation();
  return (
    <div className='my-8 flex min-h-[50vh] w-full items-center justify-center'>
      <p className='mb-8 text-center text-black'>{t('empty-list')}</p>
    </div>
  );
};
