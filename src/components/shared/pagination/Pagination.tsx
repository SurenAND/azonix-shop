import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type paginationPropsType = {
  page: number;
  totalPages: number;
  OnSetPage: (pageNo: number) => void;
};

const Pagination = ({ page, totalPages, OnSetPage }: paginationPropsType) => {
  const { i18n } = useTranslation();
  const [pages, setPages] = useState<number[]>([]);

  const changePaginationNums = (page: number) => {
    const newPages = [];
    const startIdx = Math.max(1, page - 1);
    const endIdx = Math.min(totalPages, startIdx + 3);

    for (let i = startIdx; i <= endIdx; i++) {
      newPages.push(i);
    }

    setPages(newPages);
  };

  useEffect(() => {
    changePaginationNums(page);
  }, [page, totalPages]);

  // scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className='flex select-none justify-center gap-1'>
      <div className='my-6 flex flex-col items-center'>
        <div className='flex text-gray-700'>
          {/* first page */}
          <div
            className={`mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ${
              page === 1 ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => page > 1 && OnSetPage(1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-4 w-4'
            >
              <polyline
                points={
                  i18n.dir() === 'ltr' ? '11 17 6 12 11 7' : '13 17 18 12 13 7'
                }
              />
              <polyline
                points={
                  i18n.dir() === 'ltr' ? '17 17 12 12 17 7' : '7 17 2 12 7 7'
                }
              />
            </svg>
          </div>
          {/* previous page */}
          <div
            className={`mr-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ${
              page === 1 ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => page > 1 && OnSetPage(page - 1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='h-4 w-4'
            >
              <polyline
                points={
                  i18n.dir() === 'ltr' ? `15 18 9 12 15 6` : `9 18 15 12 9 6`
                }
              ></polyline>
            </svg>
          </div>
          {/* pages */}
          <div className='flex h-8 rounded-full bg-gray-200 font-medium'>
            {pages.map((pageNo: number) => {
              return (
                <div
                  className={`hidden w-8 cursor-pointer items-center justify-center rounded-full leading-5 transition duration-150 ease-in  md:flex  ${
                    pageNo === page ? 'bg-axLightPurple text-white' : ''
                  }`}
                  onClick={() => OnSetPage(pageNo)}
                  key={pageNo}
                >
                  {pageNo}
                </div>
              );
            })}
          </div>
          {/* next page */}
          <div
            className={`ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ${
              page === totalPages ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => page < totalPages && OnSetPage(page + 1)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='h-4 w-4'
            >
              <polyline
                points={
                  i18n.dir() === 'ltr' ? `9 18 15 12 9 6` : `15 18 9 12 15 6`
                }
              ></polyline>
            </svg>
          </div>
          {/* last page */}
          <div
            className={`ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 ${
              page === totalPages ? 'opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => OnSetPage(totalPages)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100%'
              height='100%'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='h-4 w-4'
            >
              <polyline
                points={
                  i18n.dir() === 'ltr' ? '13 17 18 12 13 7' : '11 17 6 12 11 7'
                }
              />
              <polyline
                points={
                  i18n.dir() === 'ltr' ? '6 17 11 12 6 7' : '18 17 13 12 18 7'
                }
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
