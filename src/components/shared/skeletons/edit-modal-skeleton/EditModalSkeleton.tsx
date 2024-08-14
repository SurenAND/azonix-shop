const EditModalSkeleton = () => {
  return (
    <form className='grid w-full animate-pulse grid-cols-1 gap-4'>
      <div className='flex flex-col'>
        <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
        <div className='h-10 rounded bg-gray-200'></div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        <div className='flex flex-col'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-10 rounded bg-gray-200'></div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-10 rounded bg-gray-200'></div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-10 rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
        <div className='flex flex-col'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-10 rounded bg-gray-200'></div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-10 rounded bg-gray-200'></div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
          <div className='h-10 rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='mb-2 h-4 w-1/4 rounded bg-gray-200'></div>
      <div className='h-48 rounded bg-gray-200'></div>
      <div className='flex flex-col'>
        <div className='h-4 w-1/4 rounded bg-gray-200'></div>
        <div className='h-10 rounded bg-gray-200'></div>
        <div className='mt-3 flex h-auto max-h-52 w-full flex-wrap items-center justify-start overflow-y-auto'>
          <div className='mb-2 h-20 w-20 rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='mt-10 h-10 rounded bg-gray-200'></div>
      <div className='mt-10 h-12 rounded bg-gray-800'></div>
    </form>
  );
};

export default EditModalSkeleton;
