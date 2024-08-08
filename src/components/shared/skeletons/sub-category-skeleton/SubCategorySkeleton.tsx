const SubCategorySkeleton = () => {
  return (
    <div className='block animate-pulse'>
      <div className='my-5 ml-14 h-6 rounded bg-gray-200'></div>
      <div className='ml-14 flex gap-5'>
        <div className='h-6 rounded-md border border-gray-300 bg-gray-200 bg-transparent px-5 py-3'></div>
        <div className='h-6 rounded-md border border-gray-300 bg-gray-200 bg-transparent px-5 py-3'></div>
        <div className='h-6 rounded-md border border-gray-300 bg-gray-200 bg-transparent px-5 py-3'></div>
      </div>
    </div>
  );
};

export default SubCategorySkeleton;
