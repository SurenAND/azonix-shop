const CheckoutSkeleton = () => {
  return (
    <div className='mt-6 w-full flex-1 animate-pulse space-y-5 sm:mt-8 lg:mt-0'>
      <div className='h-4 w-1/2 rounded bg-gray-200'></div>
      <div className='ms-2 flex flex-col gap-12 rounded-lg bg-white p-5'>
        <div className='max-h-[300px] space-y-3 overflow-y-auto p-3'></div>
        <div className='flow-root'>
          <div className='-my-3 divide-y divide-gray-200'>
            <dl className='flex items-center justify-between gap-4 py-3'>
              <div className='h-4 w-1/4 rounded bg-gray-200'></div>
              <div className='h-4 w-1/4 rounded bg-gray-200'></div>
            </dl>

            <dl className='flex items-center justify-between gap-4 py-3'>
              <div className='h-4 w-1/4 rounded bg-gray-200'></div>
              <div className='h-4 w-1/4 rounded bg-gray-200'></div>
            </dl>

            <dl className='flex items-center justify-between gap-4 py-3'>
              <div className='h-4 w-1/4 rounded bg-gray-200'></div>
              <div className='h-4 w-1/4 rounded bg-gray-200'></div>
            </dl>
          </div>
        </div>
        <div className='space-y-3'>
          <button
            type='submit'
            className='flex w-full items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4  focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50'
          >
            <div className='h-4 w-1/2 rounded bg-gray-200'></div>
          </button>
          <p className='text-sm font-normal text-gray-500 dark:text-gray-400'></p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
