import { ProductType } from "@/src/api/product/product.type";
import EditableTd from "@/src/components/shared/editable-td/EditableTd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type InventoryTableProps = {
  list: ProductType[];
  onContainEditItem: (a: boolean) => void;
  onEditHandler: (a: ProductType[]) => void;
  editMode: string;
};

function InventoryTable({
  list,
  onContainEditItem,
  onEditHandler,
  editMode,
}: InventoryTableProps) {
  const { t } = useTranslation();

  const [editPriceList, setEditPriceList] = useState<ProductType[] | []>([]);
  const [editQuantityList, setEditQuantityList] = useState<ProductType[] | []>(
    []
  );

  // reset lists for changing colorful background
  useEffect(() => {
    if (editMode === "done") {
      setEditPriceList([]);
      setEditQuantityList([]);
    }
  }, [editMode]);

  useEffect(() => {
    if (editPriceList.length > 0) {
      onContainEditItem(true);
      onEditHandler(editPriceList);
    }
    if (editQuantityList.length > 0) {
      onContainEditItem(true);
      onEditHandler(editQuantityList);
    } else {
      onContainEditItem(false);
    }
  }, [editPriceList, editQuantityList]);

  return (
    <table className="self-start border border-collapse rounded w-full text-center">
      <thead className="select-none">
        <tr className="bg-gray-500 text-white dark:text-black flex flex-col mb-4 sm:table-row">
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            {t("product")}
          </th>
          <th className="border text-md w-full md:w-[55%] px-1 py-3">
            {t("price")}
          </th>
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            {t("quantity")}
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
              <td className="p-1 border truncate">{product.name}</td>
              <EditableTd
                product={product}
                editList={editPriceList}
                setEditList={(list) => setEditPriceList(list)}
                editValue={product.price}
                text={t("price")}
              />
              <EditableTd
                product={product}
                editList={editQuantityList}
                setEditList={(list) => setEditQuantityList(list)}
                editValue={product.quantity}
                text={t("quantity")}
              />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default InventoryTable;
