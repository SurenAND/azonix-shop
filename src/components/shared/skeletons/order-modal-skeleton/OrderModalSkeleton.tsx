const OrderModalSkeleton = () => {
  return (
    <div className='mx-auto flex w-full animate-pulse flex-col gap-4 p-2 sm:p-4'>
      <div className='mb-4 h-4 w-full rounded bg-gray-200'></div>
      <div className='mb-4 h-4 w-full rounded bg-gray-200'></div>
      <div className='mb-4 h-4 w-full rounded bg-gray-200'></div>
      <div className='mb-4 h-4 w-full rounded bg-gray-200'></div>
      <div className='mb-4 h-4 w-full rounded bg-gray-200'></div>
      <div className='max-h-52 overflow-y-auto'>
        <table className='w-full border-collapse self-start rounded border text-center'>
          <thead className='select-none'>
            <tr className='mb-4 flex flex-col bg-gray-500 text-white dark:text-black sm:table-row'>
              <th className='text-md hidden w-full border px-1 py-3 md:table-cell md:w-[25%]'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </th>
              <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </th>
              <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </th>
              <th className='text-md w-full border px-1 py-3 md:w-[25%]'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className='mb-4 flex flex-col sm:table-row'>
              <td className='hidden border p-1 md:table-cell'>
                <div className='h-10 rounded bg-gray-200 bg-white/90'></div>
              </td>
              <td className='truncate border p-1'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </td>
              <td className='truncate border p-1'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </td>
              <td className='truncate border p-1'>
                <div className='h-4 w-full rounded bg-gray-200'></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mx-auto flex w-full justify-center sm:w-2/3 md:w-1/2'>
        <div className='h-10 w-40 rounded-full bg-gray-200'></div>
      </div>
    </div>
  );
};

export default OrderModalSkeleton;
