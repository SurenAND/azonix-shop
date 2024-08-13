import { useGetUserById, useUpdateUser } from '@/src/api/auth/auth.queries';
import { useUserContext } from '@/src/context/authContext';
import { useUserStore } from '@/src/store/user/user.store';
import { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaShieldHalved } from 'react-icons/fa6';
import { toast } from 'sonner';

const AccountSettings = () => {
  // libraries
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();

  // context & stores
  const { state } = useUserContext();
  const { setUserData } = useUserStore();

  // queries
  const { data: userData } = useGetUserById(state.userId);

  // mutations
  const { mutate: updateUser } = useUpdateUser();

  // preFill the form
  useEffect(() => {
    if (userData) {
      reset({
        username: userData?.data.user.username,
        firstname: userData?.data.user.firstname,
        lastname: userData?.data.user.lastname,
        phoneNumber: userData?.data.user.phoneNumber,
        address: userData?.data.user.address,
      });
    }
  }, [userData, reset]);

  // functions
  const onSubmit = (data: FieldValues) => {
    if (userData) {
      updateUser(
        {
          newUser: userData?.data.user,
          data: data,
        },
        {
          onSuccess(data) {
            if (data?.status === 'success') {
              setUserData({
                firstname: data?.data.user.firstname,
                lastname: data?.data.user.lastname,
                username: data?.data.user.username,
                phoneNumber: data?.data.user.phoneNumber,
                address: data?.data.user.address,
              });
              toast.success(t('change-saved'));
            }
          },
        },
      );
    }
  };

  return (
    <div className='flex h-[75vh] w-full flex-col items-center space-y-10 p-10'>
      <div className='bg-profileGradient flex w-full gap-8 rounded-lg p-5'>
        <div className='bg-profileGradient flex h-24 w-40 items-center justify-center rounded-full p-2 text-blue-500'>
          <FaShieldHalved className='h-2/3 w-2/3' />
        </div>
        <div className='flex flex-col'>
          <h1 className='mt-2 text-3xl font-black'>{t('personal-info')}</h1>
          <p>{t('personal-info-desc')}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex w-full flex-col items-center gap-2.5'
      >
        <div className='flex w-full flex-wrap justify-between p-2.5 px-5'>
          <div className='m-1 w-[45%]'>
            <label htmlFor='username' className='mb-1 block'>
              {t('username')} <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='username'
              {...register('username')}
              required
              className='w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='m-1 w-[45%]'>
            <label htmlFor='firstname' className='mb-1 block'>
              {t('firstname')} <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='firstname'
              {...register('firstname')}
              required
              className='w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='m-1 w-[45%]'>
            <label htmlFor='lastname' className='mb-1 block'>
              {t('lastname')} <span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              id='lastname'
              {...register('lastname')}
              required
              className='w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='m-1 w-[45%]'>
            <label htmlFor='phoneNumber' className='mb-1 block'>
              {t('phone-number')} <span className='text-red-500'>*</span>
            </label>
            <input
              type='tel'
              id='phoneNumber'
              {...register('phoneNumber')}
              required
              className='w-full rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>
        </div>

        <div className='w-[85%]'>
          <label htmlFor='address' className='mb-1 block'>
            {t('address')} <span className='text-red-500'>*</span>
          </label>
          <textarea
            id='address'
            {...register('address')}
            required
            className='w-full resize-none rounded border p-2 outline-none focus:ring-2 focus:ring-blue-500'
            rows={2}
          />
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

export default AccountSettings;
