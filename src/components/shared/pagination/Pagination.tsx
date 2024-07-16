import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type paginationPropsType = {
  page: number;
  totalPages: number;
  OnSetPage: (pageNo: number) => void;
};

const Pagination = ({ page, totalPages, OnSetPage }: paginationPropsType) => {
  const { i18n } = useTranslation();
  const [pages, setPages] = useState<number[]>([]);

  const changePaginationNums = (page: number) => {
    const startIdx = Math.floor((page - 1) / 4) * 4 + 1;
    const newPages = [];
    for (let i = 0; i < 4; i++) {
      if (startIdx + i <= totalPages) {
        newPages.push(startIdx + i);
      }
    }
    setPages(newPages);
  };

  // Initialize pages on component mount or when totalPages changes
  useEffect(() => {
    changePaginationNums(page);
  }, [page, totalPages]);

  return (
    <div className="flex justify-center gap-1 select-none">
      <div className="flex flex-col items-center my-6">
        <div className="flex text-gray-700">
          {/* previous page */}
          <div
            className={`h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 ${
              page === 1 ? "opacity-50" : "cursor-pointer"
            }`}
            onClick={() => page > 1 && OnSetPage(page - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-chevron-left w-4 h-4"
            >
              <polyline
                points={
                  i18n.dir() === "ltr" ? `15 18 9 12 15 6` : `9 18 15 12 9 6`
                }
              ></polyline>
            </svg>
          </div>
          {/* pages */}
          <div className="flex h-8 font-medium rounded-full bg-gray-200">
            {pages.map((pageNo: number) => {
              return (
                <div
                  className={`w-8 md:flex hidden justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in  rounded-full  ${
                    pageNo === page ? "bg-axLightPurple text-white" : ""
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
            className={`h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 ${
              page === totalPages ? "opacity-50" : "cursor-pointer"
            }`}
            onClick={() => page < totalPages && OnSetPage(page + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-chevron-right w-4 h-4"
            >
              <polyline
                points={
                  i18n.dir() === "ltr" ? `9 18 15 12 9 6` : `15 18 9 12 15 6`
                }
              ></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
