const ShopSidebarSkeleton = () => {
  return (
    <section className='relative z-50 flex h-auto w-[270px] shrink-0 transform flex-col gap-28 border-e-2 border-gray-300 bg-gray-200 px-10 py-20 transition-transform duration-200'>
      <div className='animate-pulse'>
        <h2 className='h-10 w-full rounded bg-gray-400'></h2>

        <div className='mt-1 h-44 w-full rounded bg-gray-400'></div>
        <div className='mt-1 h-44 w-full rounded bg-gray-400'></div>
        <div className='mt-1 h-44 w-full rounded bg-gray-400'></div>
      </div>
    </section>
  );
};

export default ShopSidebarSkeleton;
