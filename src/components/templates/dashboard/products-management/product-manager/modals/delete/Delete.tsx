import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

type DeleteModalProps = {
  openDelete: boolean;
  onClose: () => void;
  action: () => void;
  idToDelete: string;
};

function DeletePopUp({
  openDelete,
  onClose,
  action,
  idToDelete,
}: DeleteModalProps) {
  // libraries
  const { t } = useTranslation();

  // states
  const [inputValue, setInputValue] = useState<string>('');

  // functions
  const handleDelete = () => {
    if (inputValue === idToDelete) {
      action();
      onClose();
      setInputValue('');
    } else {
      toast.error(t('delete-popup-error'));
    }
  };

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openDelete ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`flex w-2/3 flex-col items-center justify-center rounded-xl bg-white text-start shadow transition-all dark:bg-gray-800 md:w-1/2 lg:w-1/3 ${
          openDelete ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        } `}
      >
        {/* title & close */}
        <div className='my-3 flex w-full items-center justify-between px-4'>
          {/* title */}
          <h3 className='text-lg font-bold text-gray-800 dark:text-white'>
            {t('delete-popup-title')}
          </h3>
          {/* close button */}
          <button
            onClick={onClose}
            className='rounded-lg p-1 text-gray-400 hover:text-red-500 dark:hover:text-white'
          >
            <FaTimes />
          </button>
        </div>
        {/* warning */}
        <div className='w-full border-b border-t border-orange-500/20 bg-orange-100 dark:border-gray-400/20 dark:bg-gray-600'>
          <p className='my-3 px-4 text-sm text-orange-700 dark:text-orange-300'>
            {t('delete-popup-warning')}
          </p>
        </div>
        {/* context */}
        <div className='mx-auto my-4 w-full px-4 text-gray-600 dark:text-gray-400'>
          <Trans i18nKey='delete-popup-context' values={{ idToDelete }}>
            This action <strong className='dark:text-white'>CANNOT</strong> be
            undone. This will permanently delete the
            <strong className='dark:text-white'>{idToDelete}</strong> product.
          </Trans>
        </div>
        {/* confirm */}
        <div className='flex w-full flex-col gap-1 px-4'>
          <p>{t('delete-popup-confirm-text')}</p>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type='text'
            className='focus:shadow-outline w-full appearance-none rounded border border-gray-400 bg-white px-3 py-2 leading-tight shadow placeholder:text-gray-400 focus:outline-none dark:border-gray-500 dark:bg-gray-600'
            placeholder={t('delete-popup-confirm-placeholder', {
              idToDelete,
            })}
          />
        </div>
        <div className='my-3 w-full px-4'>
          <button
            onClick={handleDelete}
            type='button'
            className='text-md w-full items-center rounded-lg bg-red-600 px-5 py-2.5 font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800'
          >
            {t('delete-popup-confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
