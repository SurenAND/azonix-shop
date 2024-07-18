import {
  useGetCategories,
  useGetSubCategories,
} from "@/src/api/category/category.queries";
import { useAddProduct } from "@/src/api/product/product.queries";
import DragDropImageUploader from "@/src/components/shared/dragdrop-image-uploader/DragDropImageUploader";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

function AddProduct() {
  const { t } = useTranslation();

  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState<File[]>([]);
  const { mutate: addNewProduct } = useAddProduct();
  const { data: categories } = useGetCategories();
  const [productCategory, setProductCategory] = useState("");
  const { data: subCategories, refetch } = useGetSubCategories({
    category: productCategory,
  });

  const filteredList = (id: string) => {
    setProductCategory(id);
  };

  useEffect(() => {
    if (categories) {
      setProductCategory(categories.data.categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    refetch();
  }, [productCategory]);

  function handleForm(data: FieldValues) {
    const FD = new FormData();
    FD.append("name", data.name);
    FD.append("price", data.price);
    FD.append("quantity", data.quantity);
    FD.append("brand", data.brand);
    FD.append("category", data.category);
    FD.append("subcategory", data.subcategory);
    FD.append("description", data.description);
    if (images && images.length > 0) {
      images.forEach((image) => {
        FD.append("images", image);
      });
    }
    addNewProduct(FD, {
      onSuccess: (data) => {
        if (data.status === "success") {
          reset();
          setImages([]);
        }
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen select-none space-y-5 w-2/3">
      <h4 className="text-4xl font-black uppercase">{t("add-product")}</h4>
      <div className="w-full max-w-3xl p-6 bg-white rounded shadow-md">
        <form
          onSubmit={handleSubmit(handleForm)}
          className="grid grid-cols-1 gap-4"
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="mb-2">{t("product-name")} :</label>
            <input
              type="text"
              {...register("name")}
              className="p-2 border rounded"
            />
          </div>
          {/* Product Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2">{t("product-price")} :</label>
              <input
                type="text"
                {...register("price")}
                className="p-2 border rounded"
              />
            </div>
            {/* Product Quantity */}
            <div className="flex flex-col">
              <label className="mb-2">{t("product-quantity")} :</label>
              <input
                type="text"
                {...register("quantity")}
                className="p-2 border rounded"
              />
            </div>
          </div>
          {/* Product Brand & Category & Sub Category */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Product Brand */}
            <div className="flex flex-col">
              <label className="mb-2">{t("product-brand")} :</label>
              <input
                type="text"
                {...register("brand")}
                className="p-2 border rounded"
              />
            </div>
            {/* Product Category */}
            <div className="flex flex-col">
              <label className="mb-2">{t("product-category")} :</label>
              <select
                {...register("category")}
                onChange={(e) => filteredList(e.target.value)}
                className="p-2 border rounded"
              >
                {categories?.data.categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            {/* Product Sub Category */}
            <div className="flex flex-col">
              <label className="mb-2">{t("product-sub-category")} :</label>
              <select
                {...register("subcategory")}
                className="p-2 border rounded"
              >
                {productCategory &&
                  subCategories?.data.subcategories.map((subCategory) => (
                    <option value={subCategory._id}>{subCategory.name}</option>
                  ))}
              </select>
            </div>
          </div>
          {/* Product Description */}
          <div className="flex flex-col">
            <label className="mb-2">{t("product-description")} :</label>
            <textarea
              {...register("description")}
              className="p-2 border rounded resize-none"
              rows={2}
            />
          </div>
          {/* Product Image */}
          {/* <div className="flex flex-col">
            <label className="mb-2">{t("product-image")} :</label>
            <input
              type="file"
              {...register("images")}
              className="p-2 border rounded"
            />
          </div> */}
          <DragDropImageUploader images={images} setImages={setImages} />
          {/* Add Product Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-purple-700 rounded hover:bg-purple-800"
          >
            {t("add-product")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
