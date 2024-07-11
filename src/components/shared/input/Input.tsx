export default function MyInput({
  type,
  placeholder,
  name,
  register,
  required,
}: {
  type: string;
  placeholder: string;
  name: string;
  register: any;
  required: boolean;
}) {
  return (
    <div className="w-7/10 bg-gray-200 rounded-md my-1">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-purple-700"
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name, { required })}
      />
    </div>
  );
}
