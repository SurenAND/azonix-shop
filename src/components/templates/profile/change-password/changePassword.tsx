import { useGetUserById, useUpdateUser } from '@/src/api/auth/auth.queries';
import { useUserContext } from '@/src/context/authContext';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { toast } from 'sonner';

const ChangePassword = () => {
  // libraries
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();

  // contexts
  const { state } = useUserContext();

  // queries
  const { data: userData } = useGetUserById(state.userId);

  // mutations
  const { mutate: updateUser } = useUpdateUser();

  // functions
  const onSubmit = (data: FieldValues) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error(t('password-not-match'));
    } else if (userData && data.newPassword && data.confirmNewPassword) {
      updateUser(
        {
          newUser: userData?.data.user,
          data: {
            password: data.newPassword,
          },
        },
        {
          onSuccess: () => {
            toast.success(t('password-changed-successfully'));
            reset();
          },
        },
      );
    }
  };

  return (
    <div className='flex min-h-[75vh] w-full flex-col items-center space-y-8 p-4 sm:p-10'>
      <div className='flex w-full flex-col gap-4 rounded-lg bg-profileGradient p-4 sm:flex-row sm:gap-8 sm:p-5'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-profileGradient p-2 text-blue-500 sm:h-24 sm:w-40'>
          <BsFillShieldLockFill className='h-2/3 w-2/3' />
        </div>
        <div className='flex flex-col'>
          <h1 className='text-2xl font-black sm:text-3xl'>
            {t('change-password')}
          </h1>
          <p className='text-sm sm:text-base'>{t('change-password-desc')}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center gap-4'
      >
        <div className='flex w-full flex-col p-2 sm:flex-row sm:flex-wrap sm:justify-between sm:p-5'>
          <div className='m-1 w-full sm:w-[45%]'>
            <label
              htmlFor='new-pass'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              {t('new-password')} <span className='text-red-500'>*</span>
            </label>
            <input
              id='new-pass'
              type='password'
              {...register('newPassword')}
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>

          <div className='m-1 w-full sm:w-[45%]'>
            <label
              htmlFor='confirm-new-pass'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              {t('confirm-new-password')}{' '}
              <span className='text-red-500'>*</span>
            </label>
            <input
              id='confirm-new-pass'
              type='password'
              {...register('confirmNewPassword')}
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 sm:w-auto'
        >
          {t('save-changes')}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
