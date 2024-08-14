import { useGetUserById, useUpdateUser } from '@/src/api/auth/auth.queries';
import UserEditModalSkeleton from '@/src/components/shared/skeletons/user-edit-modal-skeleton/UserEditModalSkeleton';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';

type EditModalProps = {
  openEdit: boolean;
  onClose: () => void;
  idToEdit: string;
  setIdToEdit: Dispatch<SetStateAction<string>>;
};

const EditPopUp = ({
  openEdit,
  onClose,
  idToEdit,
  setIdToEdit,
}: EditModalProps) => {
  // libraries
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // mutations
  const { mutate: updateUser } = useUpdateUser();

  // queries
  const { data: oldUser, isFetching } = useGetUserById(idToEdit);

  // preFill the form
  useEffect(() => {
    if (oldUser) {
      reset({
        firstname: oldUser?.data?.user?.firstname || '',
        lastname: oldUser?.data?.user?.lastname || '',
        username: oldUser?.data?.user?.username || '',
        phoneNumber: oldUser?.data?.user?.phoneNumber || '',
        address: oldUser?.data?.user?.address || '',
      });
    }
  }, [oldUser, reset]);

  // functions
  const handleForm = (data: FieldValues) => {
    if (oldUser) {
      updateUser(
        {
          newUser: oldUser?.data.user,
          data: data,
        },
        {
          onSuccess: (data) => {
            if (data.status === 'success') {
              reset();
              onClose();
              setIdToEdit('');
              toast.success(t('changes-saved'));
            }
          },
        },
      );
    }
  };

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openEdit ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[95vh] w-5/6 flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-6 text-start shadow transition-all dark:bg-gray-800 lg:w-1/2 ${
          openEdit ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className='absolute end-4 top-4 rounded-lg p-1 text-gray-400 hover:text-red-500 dark:hover:text-white'
        >
          <FaTimes />
        </button>

        {/* edit form */}
        {isFetching ? (
          <UserEditModalSkeleton />
        ) : (
          <form
            onSubmit={handleSubmit(handleForm)}
            className='grid w-full grid-cols-1 gap-4'
          >
            {/* User First Name */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('user-first-name')} :
              </label>
              <input
                type='text'
                {...register('firstname', {
                  required: true,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* first name error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.firstname ? 'visible' : 'invisible'
                }`}
              >
                {t('user-first-name-input-error')}
              </p>
            </div>
            {/* User Last Name */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('user-last-name')} :
              </label>
              <input
                type='text'
                {...register('lastname', {
                  required: true,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* last name error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.lastname ? 'visible' : 'invisible'
                }`}
              >
                {t('user-last-name-input-error')}
              </p>
            </div>
            {/* User Username */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('user-username')} :
              </label>
              <input
                type='text'
                {...register('username', {
                  required: true,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* username error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.username ? 'visible' : 'invisible'
                }`}
              >
                {t('user-username-input-error')}
              </p>
            </div>
            {/* User Phone Number */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('user-phone-number')} :
              </label>
              <input
                type='text'
                {...register('phoneNumber', {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* phone number error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.phoneNumber ? 'visible' : 'invisible'
                }`}
              >
                {t('user-phone-number-input-error')}
              </p>
            </div>
            {/* User Address */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('user-address')} :
              </label>
              <textarea
                {...register('address', { required: true, minLength: 5 })}
                className='resize-none rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                rows={2}
              />
              {/* description error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.address ? 'visible' : 'invisible'
                }`}
              >
                {t('user-address-input-error')}
              </p>
            </div>
            {/* Update User Button */}
            <button
              type='submit'
              className='w-full rounded bg-purple-700 py-2 text-white hover:bg-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800'
            >
              {t('update-user')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPopUp;
