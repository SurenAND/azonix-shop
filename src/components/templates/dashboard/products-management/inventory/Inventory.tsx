import {
  useGetProducts,
  useUpdateProduct,
} from "@/src/api/product/product.queries";
import { ProductType } from "@/src/api/product/product.type";
import Pagination from "@/src/components/shared/pagination/Pagination";
import InventoryTable from "@/src/components/templates/dashboard/products-management/inventory/inventory-table/InventoryTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function Inventory() {
  const { t } = useTranslation();

  const [page, setPage] = useState(1);
  const [hasEditItem, setHasEditItem] = useState(false);
  const [editedList, SetEditedList] = useState<ProductType[] | []>([]);
  const [editMode, setEditMode] = useState("doing");

  const { data: products, refetch } = useGetProducts({
    page,
    limit: 20,
  });
  const { mutate: updateProduct } = useUpdateProduct();

  useEffect(() => {
    refetch();
  }, [page]);

  const containEditItem = (status: boolean) => {
    setHasEditItem(status);
    if (status) {
      setEditMode("doing");
    }
  };

  const onEditHandler = (list: ProductType[]) => {
    const newList = list.map((item) => ({
      ...item,
      price: item.price,
      quantity: item.quantity,
    }));
    SetEditedList(newList);
  };

  const editHandler = () => {
    editedList.forEach((item) => {
      updateProduct({
        newProduct: item,
        data: {
          price: item.price,
          quantity: item.quantity,
        },
      });
    });
    setEditMode("done");
    toast.success(t("changes-saved"));
  };

  return (
    <main className="p-3 min-h-screen w-full md:w-[780px]">
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{t("inventory")}</h1>
        <button
          className="bg-axLightPurple text-white text-xs py-2 px-7 rounded-lg font-semibold tracking-wide uppercase mt-2 hover:bg-axDarkPurple disabled:opacity-50"
          onClick={editHandler}
          disabled={!hasEditItem}
        >
          {t("save")}
        </button>
      </header>
      <div className="px-3 py-8 w-full md:w-[760px] min-h-[calc(100vh-100px)] mx-auto flex items-center sm:justify-center">
        <InventoryTable
          list={products?.data.products || []}
          onContainEditItem={containEditItem}
          onEditHandler={onEditHandler}
          editMode={editMode}
        />
      </div>
      {products && (
        <Pagination
          page={page}
          totalPages={products.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
    </main>
  );
}

export default Inventory;
