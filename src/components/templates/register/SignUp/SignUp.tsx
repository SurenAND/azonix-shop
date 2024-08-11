import { useSignup } from '@/src/api/auth/auth.queries';
import { newUserType } from '@/src/api/auth/auth.type';
import MyInput from '@/src/components/shared/input/Input';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CgEye } from 'react-icons/cg';
import { TbEyeClosed } from 'react-icons/tb';

type SignUpTemplateProps = {
  active: boolean;
};

export default function SignUpTemplate({ active }: SignUpTemplateProps) {
  // libraries
  const { t, i18n } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // states
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // mutations
  const { mutate: signupMutate } = useSignup();

  // functions
  const handleSignUp = (data: FieldValues) => {
    const newUser = data as newUserType;
    signupMutate(newUser);
  };

  return (
    <div
      className={`duration-600 z-2 absolute start-0 top-0 h-full w-full transition-all ease-in-out sm:w-1/2 ${
        active
          ? i18n.dir() === 'ltr'
            ? 'sm:translate-x-full'
            : 'sm:-translate-x-full'
          : 'sm:translate-x-0'
      }`}
    >
      <form
        className='flex h-full flex-col items-center justify-center py-10'
        onSubmit={handleSubmit(handleSignUp)}
      >
        <h3 className='mb-5 text-3xl font-bold'>{t('create-account')}</h3>
        {/* inputs */}
        <p className='text-xs'>{t('use-details-for-registration')}</p>
        <MyInput
          type='text'
          placeholder={t('firstname')}
          name='firstname'
          register={register}
          required={true}
          pattern={/^[a-zA-Z\u0600-\u06FF].{4,}$/}
        />
        {/* firstname error message */}
        <p
          className={`w-2/3 text-center text-xs text-rose-400 ${
            errors.firstname ? 'visible' : 'invisible'
          }`}
        >
          {t('firstname-input-error')}
        </p>
        <MyInput
          type='text'
          placeholder={t('lastname')}
          name='lastname'
          register={register}
          required={true}
          pattern={/^[a-zA-Z\u0600-\u06FF].{4,}$/}
        />
        {/* lastname error message */}
        <p
          className={`w-2/3 text-center text-xs text-rose-400 ${
            errors.lastname ? 'visible' : 'invisible'
          }`}
        >
          {t('lastname-input-error')}
        </p>
        <MyInput
          type='text'
          placeholder={t('phone-number')}
          name='phoneNumber'
          register={register}
          required={true}
          pattern={/^\d{11}$/}
        />
        {/* phone number error message */}
        <p
          className={`w-2/3 text-center text-xs text-rose-400 ${
            errors.phoneNumber ? 'visible' : 'invisible'
          }`}
        >
          {t('phone-number-input-error')}
        </p>
        <MyInput
          type='text'
          placeholder={t('address')}
          name='address'
          register={register}
          required={true}
          pattern={/^.{4,}$/}
        />
        {/* address error message */}
        <p
          className={`w-2/3 text-center text-xs text-rose-400 ${
            errors.address ? 'visible' : 'invisible'
          }`}
        >
          {t('address-input-error')}
        </p>
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
          className={`w-2/3 text-center text-xs text-rose-400 ${
            errors.password ? 'visible' : 'invisible'
          }`}
        >
          {t('password-input-error')}
        </p>
        <button
          className={`mt-2 rounded-lg bg-axLightPurple px-14 py-4 text-xs font-semibold uppercase text-white hover:bg-axDarkPurple ${
            i18n.dir() === 'ltr' ? 'tracking-wide' : ''
          }`}
          type='submit'
        >
          {t('signup')}
        </button>
      </form>
    </div>
  );
}
