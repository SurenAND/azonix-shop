import { useLogin } from '@/src/api/auth/auth.queries';
import MyIconBtn from '@/src/components/shared/icon-button/IconButton';
import MyInput from '@/src/components/shared/input/Input';
import Link from 'next/link';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CgEye } from 'react-icons/cg';
import { FaFacebookF, FaGithub } from 'react-icons/fa';
import { FaGooglePlusG, FaLinkedinIn } from 'react-icons/fa6';
import { TbEyeClosed } from 'react-icons/tb';

interface LoginFormValues {
  username: string;
  password: string;
}

export default function LogInTemplate({ active }: { active: boolean }) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t, i18n } = useTranslation();

  const { mutate: loginMutate } = useLogin();

  const handleLogin = (data: FieldValues) => {
    const loginData = data as LoginFormValues;
    loginMutate(loginData);
  };

  return (
    <div
      className={`duration-600 z-2 absolute start-0 top-0 h-full w-full transition-all ease-in-out sm:w-1/2 ${
        active
          ? i18n.dir() === 'ltr'
            ? 'sm:-translate-x-full'
            : 'sm:translate-x-full'
          : 'sm:translate-x-0'
      }`}
    >
      <form
        className='flex h-full flex-col items-center justify-center py-10'
        onSubmit={handleSubmit(handleLogin)}
      >
        <h3 className='text-3xl font-bold'>{t('login')}</h3>
        {/* login options */}
        <div className='my-4 flex flex-row gap-3'>
          <MyIconBtn>
            <FaGooglePlusG size={20} color='black' />
          </MyIconBtn>
          <MyIconBtn>
            <FaFacebookF size={15} color='black' />
          </MyIconBtn>
          <MyIconBtn>
            <FaGithub size={15} color='black' />
          </MyIconBtn>
          <MyIconBtn>
            <FaLinkedinIn size={15} color='black' />
          </MyIconBtn>
        </div>
        {/* inputs */}
        <p className='text-xs'>{t('use-username-password')}</p>
        <MyInput
          type='text'
          placeholder={t('username')}
          name='username'
          register={register}
          required={true}
          pattern={/^.{4,15}$/}
        />
        {/* username error message */}
        <p
          className={`w-2/3 text-center text-xs text-rose-400 ${
            errors.username ? 'visible' : 'invisible'
          }`}
        >
          {t('username-input-error')}
        </p>
        <MyInput
          type={`${showPassword ? 'text' : 'password'}`}
          placeholder={t('password')}
          name='password'
          register={register}
          required={true}
          pattern={/^(?=.*\d)(?=.*[a-z]).{6,}$/}
          icon={
            showPassword ? (
              <CgEye onClick={() => setShowPassword(false)} />
            ) : (
              <TbEyeClosed onClick={() => setShowPassword(true)} />
            )
          }
        />
        {/* password error message */}
        <p
          className={`w-3/4 text-center text-xs text-rose-400 ${
            errors.password ? 'visible' : 'invisible'
          }`}
        >
          {t('password-input-error')}
        </p>

        <Link
          href='/#'
          className='my-4 block text-xs text-gray-800 no-underline'
        >
          {t('forget-password')}
        </Link>
        <button
          type='submit'
          className={`mt-2 rounded-lg bg-axLightPurple px-14 py-4 text-xs font-semibold uppercase text-white hover:bg-axDarkPurple ${
            i18n.dir() === 'ltr' ? 'tracking-wide' : ''
          }`}
        >
          {t('login')}
        </button>
      </form>
    </div>
  );
}
