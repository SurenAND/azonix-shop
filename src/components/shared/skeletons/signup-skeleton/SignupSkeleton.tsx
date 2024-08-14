const SignupSkeleton = () => {
  return (
    <div className='duration-600 z-2 absolute start-0 top-0 h-full w-full animate-pulse sm:w-1/2'>
      <form className='flex h-full flex-col items-center justify-center py-10'>
        <div className='mb-5 h-10 w-2/4 rounded bg-gray-200'></div>
        <div className='mb-2 h-4 w-full rounded bg-gray-200'></div>
        <div className='mb-2 h-10 w-3/4 rounded bg-gray-200'></div>
        <div className='invisible mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mb-2 h-10 w-3/4 rounded bg-gray-200'></div>
        <div className='invisible mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mb-2 h-10 w-3/4 rounded bg-gray-200'></div>
        <div className='invisible mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mb-2 h-10 w-3/4 rounded bg-gray-200'></div>
        <div className='invisible mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mb-2 h-10 w-3/4 rounded bg-gray-200'></div>
        <div className='invisible mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mb-2 h-10 w-3/4 rounded bg-gray-200'></div>
        <div className='invisible mb-2 h-4 w-2/3 rounded bg-gray-200'></div>
        <div className='mt-2 h-10 rounded-lg bg-gray-200 px-14 py-4 text-xs font-semibold uppercase'></div>
      </form>
    </div>
  );
};

export default SignupSkeleton;
