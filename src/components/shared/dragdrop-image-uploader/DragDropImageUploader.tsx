import Image from 'next/image';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type DragDropImageUploaderProps = {
  images: File[];
  setImages: Dispatch<SetStateAction<File[]>>;
  deleteImage: (index: number) => void;
};

function DragDropImageUploader({
  images,
  setImages,
  deleteImage,
}: DragDropImageUploaderProps) {
  // libraries
  const { t } = useTranslation();

  // states
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // functions
  const selectFiles = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    if (images?.length + files.length > 4) {
      toast.error('You can only upload up to 4 images');
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') {
        toast.error('Only image files are allowed');
        return;
      }
      if (!images?.some((e) => e.name === files[i].name)) {
        setImages((prev) => [...prev, files[i]]);
      }
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = 'copy';
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
    if (images?.length + files.length > 4) {
      toast.error(t('image-upload-limitation-error'));
      return;
    }
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') {
        toast.error(t('image-upload-type-error'));
        return;
      }
      if (!images?.some((e) => e.name === files[i].name)) {
        setImages((prev) => [...prev, files[i]]);
      }
    }
  };

  return (
    <div className='hidden overflow-hidden rounded-md p-3 shadow dark:bg-gray-800 lg:block'>
      {/* title */}
      <div className='text-center'>
        <p className='font-bold text-axLightPurple dark:text-white'>
          {t('drag-drop-images')}
        </p>
      </div>
      {/* drag drop area */}
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`mt-3 flex h-36 select-none items-center justify-center rounded-md border-2 border-dashed border-axLightPurple bg-white dark:border-gray-600 dark:bg-gray-700 ${
          isDragging ? 'text-lg' : ''
        }`}
      >
        {isDragging ? (
          <span className='ml-1 cursor-pointer text-axLightPurple duration-500 hover:opacity-60 dark:text-white'>
            {t('drop-images-here')}
          </span>
        ) : (
          <>
            {t('drag-drop-image-here')}
            <span
              role='button'
              onClick={selectFiles}
              className='ms-1 cursor-pointer text-axLightPurple duration-500 hover:opacity-60 dark:font-bold dark:text-violet-400'
            >
              {t('browse')}
            </span>
          </>
        )}
        <input
          type='file'
          className='file'
          multiple
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={onFileSelect}
        />
      </div>
      {/* images */}
      <div className='mt-3 flex h-auto max-h-52 w-full flex-wrap items-center justify-start overflow-y-auto'>
        {images?.map((image, index) => (
          <div className='relative mb-2 mr-1 h-20 w-20' key={index}>
            <span
              className='absolute -end-2 -top-[2px] z-50 cursor-pointer text-xl text-axLightPurple dark:top-[2px] dark:flex dark:h-6 dark:w-6 dark:items-end dark:justify-center dark:rounded-full dark:bg-red-600 dark:text-violet-400'
              onClick={() => deleteImage(index)}
            >
              &times;
            </span>
            <Image
              className='rounded-md object-cover'
              src={URL.createObjectURL(image)}
              alt={image?.name || 'Uploaded image'}
              fill
              sizes='80px'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DragDropImageUploader;
