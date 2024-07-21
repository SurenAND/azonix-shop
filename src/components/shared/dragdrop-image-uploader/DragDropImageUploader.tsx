import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function DragDropImageUploader({
  images,
  setImages,
  deleteImage,
}: {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  deleteImage: (index: number) => void;
}) {
  const { t } = useTranslation();

  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (images.length + files.length > 4) {
      toast.error("You can only upload up to 4 images");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") {
        toast.error("Only image files are allowed");
        return;
      }
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prev) => [...prev, files[i]]);
      }
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };
  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    if (images.length + files.length > 4) {
      toast.error(t("image-upload-limitation-error"));
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") {
        toast.error(t("image-upload-type-error"));
        return;
      }
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prev) => [...prev, files[i]]);
      }
    }
  };

  return (
    <div className="hidden lg:block p-3 shadow rounded-md overflow-hidden dark:bg-gray-800">
      <div className="text-center">
        <p className="font-bold text-axLightPurple dark:text-white">
          {t("drag-drop-images")}
        </p>
      </div>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`h-36 rounded-md border-2 border-dashed border-axLightPurple bg-white dark:border-gray-600 dark:bg-gray-700 flex items-center justify-center select-none mt-3 ${
          isDragging ? "text-lg" : ""
        }`}
      >
        {isDragging ? (
          <span className="text-axLightPurple ml-1 cursor-pointer duration-500 hover:opacity-60 dark:text-white">
            {t("drop-images-here")}
          </span>
        ) : (
          <>
            {t("drag-drop-image-here")}
            <span
              role="button"
              onClick={selectFiles}
              className="text-axLightPurple ms-1 cursor-pointer duration-500 hover:opacity-60 dark:text-violet-400 dark:font-bold"
            >
              {t("browse")}
            </span>
          </>
        )}
        <input
          type="file"
          className="file"
          multiple
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </div>
      <div className="w-full h-auto flex justify-start items-center flex-wrap max-h-52 overflow-y-auto mt-3">
        {images.map((image, index) => (
          <div className="w-20 mr-1 h-20 relative mb-2" key={index}>
            <span
              className="absolute -top-[2px] -end-2 text-xl cursor-pointer z-50 text-axLightPurple dark:text-violet-400 dark:bg-red-600 dark:rounded-full dark:w-6 dark:h-6 dark:flex dark:items-end dark:justify-center dark:top-[2px]"
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
  );
}

export default DragDropImageUploader;
