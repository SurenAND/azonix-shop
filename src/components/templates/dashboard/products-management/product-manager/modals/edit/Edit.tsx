import {
  useGetCategories,
  useGetSubCategories,
} from "@/src/api/category/category.queries";
import {
  useGetProductById,
  useUpdateProduct,
} from "@/src/api/product/product.queries";
import DragDropImageUploader from "@/src/components/shared/dragdrop-image-uploader/DragDropImageUploader";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner";

type EditModalProps = {
  openEdit: boolean;
  onClose: () => void;
  idToEdit: string;
  setIdToEdit: Dispatch<SetStateAction<string>>;
};

const EditPopUp = ({
  openEdit,
  onClose,
  idToEdit,
  setIdToEdit,
}: EditModalProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState<File[]>([]);
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: categories } = useGetCategories();
  const [productCategory, setProductCategory] = useState("");
  const { data: subCategories, refetch } = useGetSubCategories({
    category: productCategory,
  });
  const { data: oldProduct } = useGetProductById(idToEdit);

  const filteredList = useCallback((id: string) => {
    setProductCategory(id);
  }, []);

  const deleteImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (categories) {
      setProductCategory(categories.data.categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    refetch();
  }, [productCategory, refetch]);

  useEffect(() => {
    if (oldProduct) {
      reset({
        name: oldProduct?.data?.product?.name || "",
        price: oldProduct?.data?.product?.price || "",
        quantity: oldProduct?.data?.product?.quantity || "",
        brand: oldProduct?.data?.product?.brand || "",
        description: oldProduct?.data?.product?.description || "",
        category: oldProduct?.data?.product?.category?._id || "",
        subcategory: oldProduct?.data?.product?.subcategory?._id || "",
      });
      setProductCategory(oldProduct?.data?.product?.category?._id || "");
    }

    const fetchImages = async () => {
      const imageUrls = oldProduct?.data?.product?.images;
      if (imageUrls) {
        // Convert image URLs to File objects
        const imageFiles = await Promise.all(
          imageUrls.map(async (url) => {
            const imageUrl = `http://${url}`;
            const response = await fetch(imageUrl);
            const data = await response.blob();
            return new File([data], "image.jpg", { type: "image/jpeg" });
          })
        );
        setImages(imageFiles);
      }
    };

    fetchImages();
  }, [oldProduct, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => [...prev, file]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleForm = (data: FieldValues) => {
    const FD = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      FD.append(key, value as string);
    });
    images.forEach((image) => {
      FD.append("images", image);
    });

    if (oldProduct) {
      updateProduct(
        {
          newProduct: oldProduct.data.product,
          data: FD,
        },
        {
          onSuccess: (data) => {
            if (data.status === "success") {
              reset();
              setImages([]);
              onClose();
              setIdToEdit("");
              toast.success(t("changes-saved"));
            }
          },
        }
      );
    }
  };

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${
        openEdit ? "visible bg-black/30" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`max-h-[95vh] overflow-y-auto relative w-2/3 lg:w-1/2 p-6 flex flex-col justify-start items-center rounded-xl shadow transition-all bg-white dark:bg-gray-800 text-start ${
          openEdit ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-gray-400 dark:hover:text-white hover:text-red-500 absolute top-4 end-4"
        >
          <FaTimes />
        </button>

        {/* edit form */}
        <form
          onSubmit={handleSubmit(handleForm)}
          className="grid grid-cols-1 gap-4 w-full"
        >
          {/* Product Name */}
          <div className="flex flex-col">
            <label className="mb-2 dark:text-gray-300">
              {t("product-name")} :
            </label>
            <input
              type="text"
              {...register("name", {
                required: true,
              })}
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {/* name error message */}
            <p
              className={`text-rose-400 text-xs ${
                errors.name ? "visible" : "invisible"
              }`}
            >
              {t("product-name-input-error")}
            </p>
          </div>
          {/* Product Price */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 dark:text-gray-300">
                {t("product-price")} :
              </label>
              <input
                type="text"
                {...register("price", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {/* price error message */}
              <p
                className={`text-rose-400 text-xs ${
                  errors.price ? "visible" : "invisible"
                }`}
              >
                {t("product-price-input-error")}
              </p>
            </div>
            {/* Product Quantity */}
            <div className="flex flex-col">
              <label className="mb-2 dark:text-gray-300">
                {t("product-quantity")} :
              </label>
              <input
                type="text"
                {...register("quantity", {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {/* quantity error message */}
              <p
                className={`text-rose-400 text-xs ${
                  errors.quantity ? "visible" : "invisible"
                }`}
              >
                {t("product-quantity-input-error")}
              </p>
            </div>
          </div>
          {/* Product Brand & Category & Sub Category */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* Product Brand */}
            <div className="flex flex-col">
              <label className="mb-2 dark:text-gray-300">
                {t("product-brand")} :
              </label>
              <input
                type="text"
                {...register("brand", {
                  required: true,
                  pattern: /^[a-zA-Z0-9 ]+$/,
                })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              {/* brand error message */}
              <p
                className={`text-rose-400 text-xs ${
                  errors.brand ? "visible" : "invisible"
                }`}
              >
                {t("product-brand-input-error")}
              </p>
            </div>
            {/* Product Category */}
            <div className="flex flex-col">
              <label className="mb-2 dark:text-gray-300">
                {t("product-category")} :
              </label>
              <select
                {...register("category", { required: true })}
                onChange={(e) => filteredList(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                {categories?.data.categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </select>
              {/* category error message */}
              <p
                className={`text-rose-400 text-xs ${
                  errors.category ? "visible" : "invisible"
                }`}
              >
                {t("product-category-input-error")}
              </p>
            </div>
            {/* Product Sub Category */}
            <div className="flex flex-col">
              <label className="mb-2 dark:text-gray-300">
                {t("product-sub-category")} :
              </label>
              <select
                {...register("subcategory", { required: true })}
                className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                {productCategory &&
                  subCategories?.data.subcategories.map((subCategory) => (
                    <option value={subCategory._id}>{subCategory.name}</option>
                  ))}
              </select>
              {/* subcategory error message */}
              <p
                className={`text-rose-400 text-xs ${
                  errors.subcategory ? "visible" : "invisible"
                }`}
              >
                {t("product-sub-category-input-error")}
              </p>
            </div>
          </div>
          {/* Product Description */}
          <div className="flex flex-col">
            <label className="mb-2 dark:text-gray-300">
              {t("product-description")} :
            </label>
            <textarea
              {...register("description", { required: true, minLength: 10 })}
              className="p-2 border rounded resize-none dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={2}
            />
            {/* description error message */}
            <p
              className={`text-rose-400 text-xs ${
                errors.description ? "visible" : "invisible"
              }`}
            >
              {t("product-description-input-error")}
            </p>
          </div>
          {/* Product Image */}
          <div className="flex lg:hidden flex-col">
            <label className="mb-2 dark:text-gray-300">
              {t("product-image")} :
            </label>
            <input
              type="file"
              className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
              onChange={handleImageChange}
            />
            <div className="w-full h-auto flex justify-start items-center flex-wrap max-h-52 overflow-y-auto mt-3">
              {images.map((image, index) => (
                <div className="w-20 mr-1 h-20 relative mb-2" key={index}>
                  <span
                    className="absolute -top-[2px] -end-2 text-xl cursor-pointer z-50 text-axLightPurple dark:text-violet-400"
                    onClick={() => deleteImage(index)}
                  >
                    &times;
                  </span>
                  <img
                    className="w-full h-full rounded-md"
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                  />
                </div>
              ))}
            </div>
          </div>
          <DragDropImageUploader
            images={images}
            setImages={setImages}
            deleteImage={deleteImage}
          />
          {/* Add Product Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-purple-700 rounded hover:bg-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800"
          >
            {t("update-product")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPopUp;
