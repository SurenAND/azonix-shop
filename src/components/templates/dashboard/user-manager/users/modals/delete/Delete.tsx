import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner";

type DeleteModalProps = {
  openDelete: boolean;
  onClose: () => void;
  action: () => void;
  idToDelete: string;
};
function DeletePopUp({
  openDelete,
  onClose,
  action,
  idToDelete,
}: DeleteModalProps) {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState("");

  const handleDelete = () => {
    if (inputValue === idToDelete) {
      action();
      onClose();
      setInputValue("");
    } else {
      toast.error(t("delete-popup-error"));
    }
  };

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center items-center transition-colors ${
        openDelete ? "visible bg-black/30" : "invisible"
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-2/3 md:w-1/2 lg:w-1/3 flex flex-col justify-center items-center rounded-xl shadow transition-all bg-white dark:bg-gray-800 text-start ${
          openDelete ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } `}
      >
        {/* title & close */}
        <div className="flex justify-between items-center w-full my-3 px-4">
          {/* title */}
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            {t("delete-popup-title")}
          </h3>
          {/* close button */}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 dark:hover:text-white hover:text-red-500"
          >
            <FaTimes />
          </button>
        </div>
        {/* warning */}
        <div className="bg-orange-100 dark:bg-gray-600 border-t border-b border-orange-500/20 dark:border-gray-400/20 w-full">
          <p className="text-sm text-orange-700 dark:text-orange-300 my-3 px-4">
            {t("delete-popup-warning")}
          </p>
        </div>
        {/* context */}
        <div className="mx-auto my-4 w-full px-4 text-gray-600 dark:text-gray-400">
          <Trans i18nKey="user-delete-popup-context" values={{ idToDelete }}>
            This action <strong className="dark:text-white">CANNOT</strong> be
            undone. This will permanently delete the
            <strong className="dark:text-white">{idToDelete}</strong> product.
          </Trans>
        </div>
        {/* confirm */}
        <div className="w-full px-4 flex flex-col gap-1">
          <p>{t("user-delete-popup-confirm-text")}</p>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            className="shadow appearance-none border border-gray-400 dark:border-gray-500 rounded w-full py-2 px-3 placeholder:text-gray-400 leading-tight focus:outline-none focus:shadow-outline bg-white dark:bg-gray-600"
            placeholder={t("delete-popup-confirm-placeholder", {
              idToDelete,
            })}
          />
        </div>
        <div className="my-3 px-4 w-full">
          <button
            onClick={handleDelete}
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md items-center px-5 py-2.5 w-full"
          >
            {t("user-delete-popup-confirm")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopUp;
