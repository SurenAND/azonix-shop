const UserEditModalSkeleton = () => {
  return (
    <form className='grid w-full animate-pulse grid-cols-1 gap-4'>
      <div className='flex flex-col'>
        <div className='mb-2 h-4 w-1/2 rounded bg-gray-200'></div>
        <div className='h-10 rounded bg-gray-200'></div>
        <div className='mt-2 h-4 w-2/3 rounded bg-gray-200'></div>
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 h-4 w-1/2 rounded bg-gray-200'></div>
        <div className='h-10 rounded bg-gray-200'></div>
        <div className='mt-2 h-4 w-2/3 rounded bg-gray-200'></div>
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 h-4 w-1/3 rounded bg-gray-200'></div>
        <div className='h-10 rounded bg-gray-200'></div>
        <div className='mt-2 h-4 w-2/3 rounded bg-gray-200'></div>
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 h-4 w-1/2 rounded bg-gray-200'></div>
        <div className='h-10 rounded bg-gray-200'></div>
        <div className='mt-2 h-4 w-2/3 rounded bg-gray-200'></div>
      </div>
      <div className='flex flex-col'>
        <div className='mb-2 h-4 w-1/3 rounded bg-gray-200'></div>
        <div className='h-20 rounded bg-gray-200'></div>
        <div className='mt-2 h-4 w-2/3 rounded bg-gray-200'></div>
      </div>
      <div className='mt-2 h-10 rounded bg-gray-200'></div>
    </form>
  );
};

export default UserEditModalSkeleton;
