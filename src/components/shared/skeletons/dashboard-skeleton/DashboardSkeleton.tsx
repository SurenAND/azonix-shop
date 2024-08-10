const DashboardSkeleton = () => {
  return (
    <div className='flex h-screen animate-pulse flex-col items-center justify-center gap-10'>
      <div className='h-16 w-1/2 rounded bg-gray-200'></div>
      <div className='h-16 w-3/4 rounded bg-gray-200'></div>
    </div>
  );
};

export default DashboardSkeleton;
