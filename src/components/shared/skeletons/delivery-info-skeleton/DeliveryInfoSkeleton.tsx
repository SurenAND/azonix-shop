const DeliveryInfoSkeleton = () => {
  return (
    <div className='min-w-0 flex-1 animate-pulse space-y-8'>
      <div className='space-y-4'>
        <div className='h-5 rounded bg-gray-200'></div>
        <div className='ms-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 sm:grid-cols-2'>
          <div className='flex h-10 flex-col rounded-lg bg-gray-200'></div>
          <div className='flex h-10 flex-col rounded-lg bg-gray-200'></div>
          <div className='flex h-10 flex-col rounded-lg bg-gray-200'></div>
          <div className='flex h-20 flex-col rounded-lg bg-gray-200'></div>
        </div>
      </div>
      <div className='space-y-4'>
        <div className='flex h-5 items-center gap-3 rounded bg-gray-200'></div>
        <div className='ms-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-5'>
          <div className='flex flex-col gap-5'>
            <div className='flex h-14 flex-col rounded-lg bg-gray-200'></div>
            <div className='flex h-10 flex-col rounded-lg bg-gray-200'></div>
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        <div className='h-5 rounded bg-gray-200'></div>
        <div className='ms-2 grid grid-cols-1 gap-4 rounded-lg bg-white p-5 sm:grid-cols-3'>
          <div className='relative flex cursor-pointer items-center justify-center gap-[1em] text-black'>
            <div className='peer h-10 appearance-none rounded-lg bg-gray-200'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryInfoSkeleton;
