import { useGetUserById, useUpdateUser } from '@/src/api/auth/auth.queries';
import { useUserContext } from '@/src/context/authContext';
import { useEffect } from 'react';
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

  // preFill form data
  useEffect(() => {
    if (userData) {
      reset({
        oldPassword: userData?.data.user.password,
        newPassword: '',
      });
    }
  }, [userData, reset]);

  // functions
  const onSubmit = (data: FieldValues) => {
    if (userData?.data.user.password !== data.oldPassword) {
      toast.error(t('old-password-incorrect'));
    } else if (userData && userData?.data.user.password !== data.newPassword) {
      updateUser({
        newUser: userData?.data.user,
        data: {
          password: data.newPassword,
        },
      });
      toast.success(t('password-changed-successfully'));
    } else {
      toast.error(t('same-password'));
    }
  };

  return (
    <div className='flex h-[75vh] w-full flex-col items-center space-y-16 p-10'>
      <div className='bg-profileGradient flex w-full gap-8 rounded-lg p-5'>
        <div className='bg-profileGradient flex h-24 w-40 items-center justify-center rounded-full p-2 text-blue-500'>
          <BsFillShieldLockFill className='h-2/3 w-2/3' />
        </div>
        <div className='flex flex-col'>
          <h1 className='mt-2 text-3xl font-black'>{t('change-password')}</h1>
          <p>{t('change-password-desc')}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center gap-4'
      >
        <div className='flex w-full flex-wrap justify-between p-5'>
          <div className='m-1 w-full md:w-[45%]'>
            <label
              htmlFor='old-pass'
              className='mb-2 block text-sm font-medium text-gray-700'
            >
              {t('old-password')} <span className='text-red-500'>*</span>
            </label>
            <input
              id='old-pass'
              type='password'
              {...register('oldPassword')}
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
            />
          </div>

          <div className='m-1 w-full md:w-[45%]'>
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
        </div>

        <button
          type='submit'
          className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
        >
          {t('save-changes')}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
