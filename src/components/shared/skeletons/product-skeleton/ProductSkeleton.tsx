const ProductSkeleton = () => {
  return (
    <section className='ms-14 mt-8 flex flex-wrap justify-center gap-5'>
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className='min-h-[10rem] w-72 animate-pulse overflow-hidden rounded-md bg-white text-gray-700 shadow-lg'
        >
          <div className='h-[180px] w-full bg-gray-300'></div>
          <div className='flex flex-col gap-3 p-5'>
            <div className='h-5 w-1/2 rounded bg-gray-300'></div>
            <div className='h-5 w-3/4 rounded bg-gray-300'></div>
            <div className='h-5 w-1/3 rounded bg-gray-300'></div>
            <div className='h-5 w-1/4 rounded bg-gray-300'></div>
            <div className='flex gap-2'>
              <div className='h-5 w-5 rounded bg-gray-300'></div>
              <div className='h-5 w-5 rounded bg-gray-300'></div>
              <div className='h-5 w-5 rounded bg-gray-300'></div>
              <div className='h-5 w-5 rounded bg-gray-300'></div>
              <div className='h-5 w-5 rounded bg-gray-300'></div>
              <div className='h-5 w-1/4 rounded bg-gray-300'></div>
            </div>
            <div className='mt-5 flex gap-2'>
              <div className='h-10 w-1/2 rounded bg-gray-300'></div>
              <div className='h-10 w-10 rounded bg-gray-300'></div>
              <div className='h-10 w-10 rounded bg-gray-300'></div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductSkeleton;
