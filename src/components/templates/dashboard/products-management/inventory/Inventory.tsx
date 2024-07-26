import {
  useGetProducts,
  useUpdateProduct,
} from "@/src/api/product/product.queries";
import { ProductType } from "@/src/api/product/product.type";
import { EmptyList } from "@/src/components/shared/empty-list/EmptyList";
import Pagination from "@/src/components/shared/pagination/Pagination";
import InventoryTable from "@/src/components/templates/dashboard/products-management/inventory/inventory-table/InventoryTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function Inventory() {
  const { t, i18n } = useTranslation();

  const [page, setPage] = useState(1);
  const [hasEditItem, setHasEditItem] = useState(false);
  const [editedProducts, setEditedProducts] = useState<ProductType[]>([]);
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

  const editHandler = () => {
    editedProducts.forEach((item) => {
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
          className={`bg-axLightPurple text-white text-xs py-2 px-7 rounded-lg font-semibold uppercase mt-2 hover:bg-axDarkPurple disabled:opacity-50 ${
            i18n.dir() === "ltr" ? "tracking-wide" : ""
          }`}
          onClick={editHandler}
          disabled={!hasEditItem}
        >
          {t("save")}
        </button>
      </header>
      <div className="px-3 py-8 w-full md:w-[760px] min-h-[calc(100vh-100px)] mx-auto flex items-center sm:justify-center">
        {products &&
        products.status === "success" &&
        products.data.products.length === 0 ? (
          <EmptyList />
        ) : (
          <InventoryTable
            list={products?.data.products || []}
            onContainEditItem={containEditItem}
            editedProducts={editedProducts}
            setEditedProducts={setEditedProducts}
            editMode={editMode}
          />
        )}
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
