import { ProductType } from "@/src/api/product/product.type";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type EditableTdProps = {
  product: ProductType;
  editValue: number;
  editList: ProductType[];
  setEditList: (list: ProductType[]) => void;
  text: string;
};

function EditableTd({
  product,
  editValue,
  editList,
  setEditList,
  text,
}: EditableTdProps) {
  const [editMode, setEditMode] = useState(true);
  const { t } = useTranslation();
  return (
    <td
      className={`p-1 border ${
        editList.find((i) => i._id === product._id)
          ? "bg-axLightPurple/60 text-white"
          : ""
      }`}
      contentEditable={editMode}
      suppressContentEditableWarning={true}
      onClick={(e) => {
        setEditMode(true);
        const event = e.target as HTMLElement;
        event.innerText = editValue.toLocaleString("en").split("٬").join("");
      }}
      onBlur={(e) => {
        if (
          e.target.innerText !==
          editValue.toLocaleString("en").split("٬").join("")
        ) {
          const list = [...editList];
          const filteredList = list.filter(
            (i: ProductType) => i._id !== product._id
          );

          const newValue = e.target.innerText;
          if (newValue.match("^[0-9]*$") !== null) {
            let editedValue: ProductType = { ...product };
            if (text === t("price")) {
              editedValue = {
                ...product,
                price: Number(newValue),
              };
            } else {
              editedValue = {
                ...product,
                quantity: Number(newValue),
              };
            }

            filteredList.push(editedValue);
          } else {
            e.target.innerText = editValue.toLocaleString("en");
          }

          setEditList(filteredList);
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          const event = e.target as HTMLElement;
          event.innerText = editValue.toLocaleString("en");

          const list = [...editList];
          const filteredList = list.filter((i) => i._id !== product._id);

          setEditList(filteredList);
          setEditMode(false);
        }
      }}
    >
      {text === t("price")
        ? editList.find((i) => i._id === product._id)
          ? editList[
              editList.findIndex((i) => i._id === product._id)
            ].price.toLocaleString("en")
          : editValue.toLocaleString("en")
        : editList.find((i) => i._id === product._id)
        ? editList[
            editList.findIndex((i) => i._id === product._id)
          ].quantity.toLocaleString("en")
        : editValue.toLocaleString("en")}
    </td>
  );
}

export default EditableTd;
