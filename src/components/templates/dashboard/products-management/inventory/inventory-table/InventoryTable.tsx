import { ProductType } from "@/src/api/product/product.type";
import EditableTd from "@/src/components/shared/editable-td/EditableTd";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type InventoryTableProps = {
  list: ProductType[];
  onContainEditItem: (a: boolean) => void;
  editedProducts: ProductType[];
  setEditedProducts: Dispatch<SetStateAction<ProductType[]>>;
  editMode: string;
};

function InventoryTable({
  list,
  onContainEditItem,
  editedProducts,
  setEditedProducts,
  editMode,
}: InventoryTableProps) {
  const { t } = useTranslation();

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setProducts(list);
  }, [list]);

  // reset lists for changing colorful background
  useEffect(() => {
    if (editMode === "done") {
      setEditedProducts([]);
    }
  }, [editMode]);

  useEffect(() => {
    if (editedProducts.length > 0) {
      onContainEditItem(true);
    } else {
      onContainEditItem(false);
    }
  }, [editedProducts]);

  return (
    <table className="self-start border border-collapse rounded w-full text-center">
      <thead className="select-none">
        <tr className="bg-gray-500 text-white dark:text-black flex flex-col mb-4 sm:table-row">
          <th className="border text-md w-full md:w-[55%] px-1 py-3">
            {t("product")}
          </th>
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            {t("price")}
          </th>
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            {t("quantity")}
          </th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          return (
            <tr
              key={product._id}
              className={`flex flex-col mb-4 sm:table-row ${
                Math.floor(index % 2) !== 0 ? "bg-gray-400 text-white" : ""
              } ${Math.floor(index % 2) !== 0 ? "dark:text-black" : ""}`}
            >
              <td className="p-1 border truncate">{product.name}</td>
              <EditableTd
                index={index}
                product={product}
                products={products}
                setProducts={setProducts}
                editedProducts={editedProducts}
                setEditedProducts={setEditedProducts}
                field="price"
              />
              <EditableTd
                index={index}
                product={product}
                products={products}
                setProducts={setProducts}
                editedProducts={editedProducts}
                setEditedProducts={setEditedProducts}
                field="quantity"
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default InventoryTable;
