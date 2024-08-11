import { ReactElement } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

type InputProps = {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  required: boolean;
  pattern?: RegExp;
  icon?: ReactElement;
};

export default function MyInput({
  type,
  placeholder,
  name,
  register,
  required,
  pattern,
  icon,
}: InputProps) {
  return (
    <div className='w-7/10 relative my-1 rounded-md'>
      <input
        className='focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:border-axLightPurple focus:outline-none'
        type={type}
        placeholder={placeholder}
        autoComplete='off'
        {...register(name, { required, pattern: pattern })}
      />
      <div className='absolute end-3 top-3 cursor-pointer text-gray-500'>
        {icon}
      </div>
    </div>
  );
}
