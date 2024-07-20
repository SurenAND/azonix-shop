import { useGetCategories } from "@/src/api/category/category.queries";
import { ProductType } from "@/src/api/product/product.type";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete, MdEdit } from "react-icons/md";

type ProductsTableProps = {
  list: ProductType[];
  onFilteredList: (e: string) => void;
  idToDelete: MutableRefObject<string>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
};

export const ProductsTable = ({
  list,
  onFilteredList,
  idToDelete,
  setOpenDelete,
}: ProductsTableProps) => {
  const { t } = useTranslation();

  const { data: categories } = useGetCategories();

  const setDeleteProductModal = (id: string) => {
    idToDelete.current = id;
    setOpenDelete(true);
  };

  const setEditProductModal = (id: string) => {};

  return (
    <table className="self-start border border-collapse rounded w-full text-center">
      <thead className="select-none">
        <tr className="bg-gray-500 text-white dark:text-black flex flex-col mb-4 sm:table-row">
          <th className="border text-md w-full md:w-[15%] px-1 py-3 md:table-cell hidden">
            {t("product-image")}
          </th>
          <th className="border text-md w-full md:w-[55%] px-1 py-3">
            {t("product-name")}
          </th>
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            <select
              name="category"
              className="bg-gray-500 text-center w-full outline-none"
              onChange={(e) => onFilteredList(e.target.value)}
            >
              <option value="">{t("all-category")}</option>
              {categories?.data.categories.map((category) => (
                <option value={category._id}>{category.name}</option>
              ))}
            </select>
          </th>
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            {t("delete-edit")}
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((product, index) => {
          return (
            <tr
              key={product._id}
              className={`flex flex-col mb-4 sm:table-row ${
                Math.floor(index % 2) !== 0 ? "bg-gray-400 text-white" : ""
              } ${Math.floor(index % 2) !== 0 ? "dark:text-black" : ""}`}
            >
              <td className="p-1 border md:table-cell hidden">
                <div className="flex justify-center select-none">
                  <img
                    src={`http://${product.images[0]}`}
                    alt={product.name}
                    className="max-w-[2rem] rounded sm:max-w-[3rem] bg-white/90"
                  />
                </div>
              </td>
              <td className="p-1 border truncate">{product.name}</td>
              <td className="p-1 border truncate">
                {product.category.name}/{product.subcategory.name}
              </td>
              <td className="p-1 border">
                <div className="flex items-center justify-center gap-4 select-none">
                  <MdDelete
                    className="cursor-pointer w-5"
                    onClick={() => setDeleteProductModal(product._id)}
                  />
                  <MdEdit
                    className="cursor-pointer w-5"
                    onClick={() => setEditProductModal(product._id)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
