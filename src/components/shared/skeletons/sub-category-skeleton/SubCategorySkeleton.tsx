const SubCategorySkeleton = () => {
  return (
    <div className='block animate-pulse'>
      <div className='my-5 ms-7 h-6 rounded bg-gray-200 sm:ms-14'></div>
      <div className='ms-7 flex gap-5 sm:ms-14'>
        <div className='h-6 rounded-md border border-gray-300 bg-gray-200 bg-transparent px-5 py-3'></div>
        <div className='h-6 rounded-md border border-gray-300 bg-gray-200 bg-transparent px-5 py-3'></div>
        <div className='h-6 rounded-md border border-gray-300 bg-gray-200 bg-transparent px-5 py-3'></div>
      </div>
    </div>
  );
};

export default SubCategorySkeleton;
