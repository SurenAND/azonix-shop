const LoginSkeleton = () => {
  return (
    <div className='duration-600 z-2 absolute start-0 top-0 h-full w-full animate-pulse transition-all ease-in-out sm:w-1/2'>
      <form className='flex h-full flex-col items-center justify-center py-10'>
        <div className='my-2 h-6 w-1/2 rounded bg-gray-200'></div>
        <div className='my-4 flex flex-row gap-3'>
          <div className='h-6 w-6 rounded bg-gray-200'></div>
          <div className='h-6 w-6 rounded bg-gray-200'></div>
          <div className='h-6 w-6 rounded bg-gray-200'></div>
          <div className='h-6 w-6 rounded bg-gray-200'></div>
        </div>
        <div className='my-2 h-4 w-full rounded bg-gray-200'></div>
        <div className='my-2 h-10 w-full rounded bg-gray-200'></div>
        <div className='my-2 h-4 w-full rounded bg-gray-200'></div>
        <div className='my-2 h-10 w-full rounded bg-gray-200'></div>
        <div className='my-2 h-4 w-3/4 rounded bg-gray-200'></div>
        <div className='my-2 h-4 w-full rounded bg-gray-200'></div>
        <div className='mt-2 h-10 rounded-lg bg-gray-200'></div>
      </form>
    </div>
  );
};

export default LoginSkeleton;
