import { ProductType } from "@/src/api/product/product.type";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

type EditableTdProps = {
  index: number;
  product: ProductType;
  field: string;
  products: ProductType[];
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
  editedProducts: ProductType[];
  setEditedProducts: Dispatch<SetStateAction<ProductType[]>>;
};

function EditableTd({
  index,
  product,
  products,
  setProducts,
  editedProducts,
  setEditedProducts,
  field,
}: EditableTdProps) {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<string | null>(null);
  const [isModified, setIsModified] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const editHandler = (editedProduct: ProductType) => {
    const updatedEditedProducts = editedProducts.map((item) =>
      item._id === editedProduct._id ? editedProduct : item
    );
    if (!editedProducts.some((item) => item._id === editedProduct._id)) {
      setEditedProducts([...editedProducts, editedProduct]);
    } else {
      setEditedProducts(updatedEditedProducts);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !isModified
      ) {
        setIsEdit(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModified]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const updatedProduct = {
      ...product,
      [field]: +e.target.value,
      [`is${field.charAt(0).toUpperCase() + field.slice(1)}Edit`]: true,
    };
    const updatedProducts = products.map((item, idx) =>
      idx === index ? updatedProduct : item
    );

    editHandler(updatedProduct);
    setIsEdit(null);
    setProducts(updatedProducts);
    setIsModified(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setIsEdit(null);
      setIsModified(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setIsModified(true);
      e.target.value = value;
    } else {
      e.preventDefault();
      toast.error(t("error-invalid-number"));
    }
  };

  const renderInput = (value: number) => (
    <input
      className="text-black w-full text-center font-bold"
      ref={inputRef}
      defaultValue={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
    />
  );

  const renderSpan = (value: number, isEdited: boolean) => (
    <span
      className={`block p-1 ${
        isEdited ? "bg-axLightPurple/60 text-white" : ""
      }`}
    >
      {value}
    </span>
  );

  const value = product[field as keyof ProductType] as number;
  const isEdited = product[
    `is${
      field.charAt(0).toUpperCase() + field.slice(1)
    }Edit` as keyof ProductType
  ] as unknown as boolean;

  return (
    <td
      onClick={() => {
        setIsEdit(product._id);
      }}
    >
      {isEdit === product._id
        ? renderInput(value)
        : renderSpan(value, isEdited)}
    </td>
  );
}

export default EditableTd;
