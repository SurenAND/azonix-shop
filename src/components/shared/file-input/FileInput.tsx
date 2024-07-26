import Upload from '@/src/assets/images/upload.png';
type MyFileInputProps = {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const MyFileInput = ({ changeHandler }: MyFileInputProps) => {
  return (
    <label
      htmlFor='doc'
      className='flex cursor-pointer items-center gap-3 rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-4'
    >
      <img className='h-16 w-auto' src={Upload.src} alt='' />
      <div className='space-y-2'>
        <h4 className='text-base font-semibold text-gray-700'>Upload a file</h4>
        <span className='text-sm text-gray-500'>Max 4 Images</span>
      </div>
      <input
        type='file'
        id='doc'
        name='doc'
        accept='png, jpg'
        hidden
        onChange={changeHandler}
      />
    </label>
  );
};

export default MyFileInput;
