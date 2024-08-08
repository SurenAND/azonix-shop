const PaymentFaSkeleton = () => {
  return (
    <div dir='rtl' className='animate-pulse'>
      <header className='flex gap-4 border-t-4 border-pink-400 sm:gap-8'>
        <div className='max-w-[4rem] bg-gray-200 p-1 sm:max-w-[5rem] sm:p-2'></div>
        <div className='inline-block rounded-b-xl bg-gray-200 p-2 sm:p-4'></div>
      </header>
      <main className='mx-2 my-16 flex max-w-[40rem] flex-col gap-4 border-4 border-gray-300 p-2 text-xs sm:mx-auto'>
        <div className='mb-4 grid grid-cols-3 items-center'>
          <div className='col-span-1 w-2/3 border-b-2 border-gray-200 bg-gray-200 px-1 py-2 font-bold text-white sm:w-1/2 sm:px-2 sm:text-base'></div>
          <div className='col-span-2 flex h-5 items-center gap-2 bg-gray-200 sm:px-8'></div>
        </div>
        <form className='flex flex-col gap-4'>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1 bg-gray-200'></div>
            <div className='col-span-2 max-w-[20rem] rounded border bg-gray-200 p-1'></div>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1 bg-gray-200'></div>
            <div className='col-span-2 max-w-[20rem] rounded border bg-gray-200 p-1'></div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1 bg-gray-200'></div>
            <div className='col-span-2 flex items-center gap-2 '>
              <div className='max-w-[3rem] rounded border bg-gray-200 p-1'></div>
              <div className='max-w-[3rem] rounded border bg-gray-200 p-1'></div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1 bg-gray-200'></div>
            <div className='col-span-2 flex items-center gap-2 '>
              <div className='max-w-[5rem] rounded border bg-gray-200 p-1'></div>
              <div className='max-w-[4rem] rounded bg-gray-200 px-4 py-1'></div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1 bg-gray-200'></div>
            <div className='col-span-2 flex items-center gap-2'>
              <div className='max-w-[5rem] rounded border bg-gray-200 p-1'></div>
              <div className='flex max-w-[8rem] gap-2 rounded border bg-gray-200 p-1'></div>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-2'>
            <div className='col-span-1 flex flex-col gap-1 bg-gray-200'></div>
            <div className='col-span-2 max-w-[20rem] rounded border bg-gray-200 p-1'></div>
          </div>

          <div className='mb-8 grid max-w-[33rem] grid-cols-3 gap-2'>
            <button
              type='button'
              className='col-span-2 w-full rounded-lg bg-axBlue p-3 font-semibold text-white shadow-lg hover:bg-axBlue/80 focus:outline-none'
            >
              <div className='rounded-md bg-gray-200'></div>
            </button>
            <button
              type='button'
              className='col-span-1 w-full rounded-lg bg-primary/90 p-3 font-semibold text-white shadow-lg hover:bg-primary focus:outline-none'
            >
              <div className='rounded-md bg-gray-200'></div>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PaymentFaSkeleton;
