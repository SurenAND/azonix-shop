import {
  useDeleteProduct,
  useGetProducts,
} from "@/src/api/product/product.queries";
import Pagination from "@/src/components/shared/pagination/Pagination";
import DeletePopUp from "@/src/components/templates/dashboard/products-management/product-manager/modals/delete/Delete";
import { ProductsTable } from "@/src/components/templates/dashboard/products-management/product-manager/product-table/ProductTable";
import { MainRoutes } from "@/src/constant/routes";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function ProductManager() {
  const { t } = useTranslation();
  const { push: pushRouter } = useRouter();
  const [page, setPage] = useState(1);
  const [productCategory, setProductCategory] = useState("");
  const { data: products, refetch } = useGetProducts({
    page,
    category: productCategory,
  });

  const { mutate: deleteProduct } = useDeleteProduct();

  const [openDelete, setOpenDelete] = useState(false);
  const idToDelete = useRef<string>("");

  const filteredList = (id: string) => {
    setProductCategory(id);
    setPage(1);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success(t("product-delete-success"));
  };

  useEffect(() => {
    refetch();
  }, [page, productCategory]);

  return (
    <main className="p-3 min-h-screen w-full md:w-[780px]">
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{t("product-manager")}</h1>
        <button
          className="bg-axLightPurple text-white text-xs py-2 px-7 rounded-lg font-semibold tracking-wide uppercase mt-2 hover:bg-axDarkPurple"
          onClick={() => pushRouter(`${MainRoutes.DASHBOARD}?view=add-product`)}
        >
          {t("add-product")}
        </button>
      </header>
      <div className="px-3 py-8 w-full md:w-[760px] min-h-[calc(100vh-100px)] mx-auto flex items-center sm:justify-center">
        <ProductsTable
          list={products?.data.products || []}
          onFilteredList={filteredList}
          idToDelete={idToDelete}
          setOpenDelete={setOpenDelete}
        />
      </div>
      {products && (
        <Pagination
          page={page}
          totalPages={products.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
      <DeletePopUp
        openDelete={openDelete}
        onClose={() => setOpenDelete(false)}
        action={() => handleDelete(idToDelete.current)}
        idToDelete={idToDelete.current}
      />
    </main>
  );
}

export default ProductManager;
