export default function MyInput({
  type,
  placeholder,
  name,
  register,
  required,
  pattern,
  icon,
}: {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  required: boolean;
  pattern?: RegExp;
  icon?: any;
}) {
  return (
    <div className="w-7/10 rounded-md my-1 relative">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-axLightPurple"
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, { required, pattern: pattern })}
      />
      <div className="absolute right-3 top-3 text-gray-500 cursor-pointer">
        {icon}
      </div>
    </div>
  );
}
