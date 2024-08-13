import {
  useGetCategories,
  useGetSubCategories,
} from '@/src/api/category/category.queries';
import {
  useGetProductById,
  useUpdateProduct,
} from '@/src/api/product/product.queries';
import DragDropImageUploader from '@/src/components/shared/dragdrop-image-uploader/DragDropImageUploader';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

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
  // libraries
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // states
  const [images, setImages] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');
  const [productCategory, setProductCategory] = useState<string>('');

  // mutations
  const { mutate: updateProduct } = useUpdateProduct();

  // queries
  const { data: categories } = useGetCategories();
  const { data: subCategories, refetch } = useGetSubCategories({
    category: productCategory,
  });
  const { data: oldProduct } = useGetProductById(idToEdit);

  useEffect(() => {
    if (categories) {
      setProductCategory(categories.data.categories[0]._id);
    }
  }, [categories]);

  useEffect(() => {
    refetch();
  }, [productCategory]);

  // preFetch data
  useEffect(() => {
    if (oldProduct) {
      reset({
        name: oldProduct?.data?.product?.name || '',
        price: oldProduct?.data?.product?.price || '',
        discountPercentage: oldProduct?.data?.product?.discountPercentage || '',
        quantity: oldProduct?.data?.product?.quantity || '',
        brand: oldProduct?.data?.product?.brand || '',
        category: oldProduct?.data?.product?.category?._id || '',
        subcategory: oldProduct?.data?.product?.subcategory?._id || '',
      });
      setProductCategory(oldProduct?.data?.product?.category?._id || '');
      setDescription(oldProduct?.data?.product?.description || '');
    }

    const fetchImages = async () => {
      const imageUrls = oldProduct?.data?.product?.images;
      if (imageUrls) {
        // Convert image URLs to File objects
        const imageFiles = await Promise.all(
          imageUrls.map(async (url) => {
            const imageUrl = url;
            const response = await fetch(imageUrl);
            const data = await response.blob();
            return new File([data], 'image.jpg', { type: 'image/jpeg' });
          }),
        );
        setImages(imageFiles);
      }
    };

    fetchImages();
  }, [oldProduct, reset]);

  // functions
  const filteredList = useCallback((id: string) => {
    setProductCategory(id);
  }, []);

  const deleteImage = useCallback((index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

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
    FD.append('description', description);
    images.forEach((image) => {
      FD.append('images', image);
    });

    if (oldProduct) {
      updateProduct(
        {
          productId: oldProduct.data.product._id,
          data: FD,
        },
        {
          onSuccess: (data) => {
            if (data.status === 'success') {
              reset();
              setImages([]);
              onClose();
              setIdToEdit('');
              toast.success(t('changes-saved'));
            }
          },
        },
      );
    }
  };

  return (
    // backdrop
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openEdit ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[95vh] w-2/3 flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-6 text-start shadow transition-all dark:bg-gray-800 lg:w-1/2 ${
          openEdit ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        {/* close button */}
        <button
          onClick={onClose}
          className='absolute end-4 top-4 rounded-lg p-1 text-gray-400 hover:text-red-500 dark:hover:text-white'
        >
          <FaTimes />
        </button>

        {/* edit form */}
        <form
          onSubmit={handleSubmit(handleForm)}
          className='grid w-full grid-cols-1 gap-4'
        >
          {/* Product Name */}
          <div className='flex flex-col'>
            <label className='mb-2 dark:text-gray-300'>
              {t('product-name')} :
            </label>
            <input
              type='text'
              {...register('name', {
                required: true,
              })}
              className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            />
            {/* name error message */}
            <p
              className={`text-xs text-rose-400 ${
                errors.name ? 'visible' : 'invisible'
              }`}
            >
              {t('product-name-input-error')}
            </p>
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {/* Product Price */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-price')} :
              </label>
              <input
                type='text'
                {...register('price', {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* price error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.price ? 'visible' : 'invisible'
                }`}
              >
                {t('product-price-input-error')}
              </p>
            </div>
            {/* Product Discount Percentage */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-discount-percentage')} :
              </label>
              <input
                type='text'
                {...register('discountPercentage', {
                  required: true,
                  pattern: /^[0-9]+$/,
                  maxLength: 3,
                  minLength: 1,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* discount percentage error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.discountPercentage ? 'visible' : 'invisible'
                }`}
              >
                {t('product-discount-percentage-input-error')}
              </p>
            </div>
            {/* Product Quantity */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-quantity')} :
              </label>
              <input
                type='text'
                {...register('quantity', {
                  required: true,
                  pattern: /^[0-9]+$/,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* quantity error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.quantity ? 'visible' : 'invisible'
                }`}
              >
                {t('product-quantity-input-error')}
              </p>
            </div>
          </div>
          {/* Product Brand & Category & Sub Category */}
          <div className='grid gap-4 md:grid-cols-3'>
            {/* Product Brand */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-brand')} :
              </label>
              <input
                type='text'
                {...register('brand', {
                  required: true,
                  pattern: /^[a-zA-Z0-9 ]+$/,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {/* brand error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.brand ? 'visible' : 'invisible'
                }`}
              >
                {t('product-brand-input-error')}
              </p>
            </div>
            {/* Product Category */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-category')} :
              </label>
              <select
                {...register('category', { required: true })}
                onChange={(e) => filteredList(e.target.value)}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              >
                {categories?.data.categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* category error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.category ? 'visible' : 'invisible'
                }`}
              >
                {t('product-category-input-error')}
              </p>
            </div>
            {/* Product Sub Category */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-sub-category')} :
              </label>
              <select
                {...register('subcategory', { required: true })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              >
                {productCategory &&
                  subCategories?.data.subcategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
              </select>
              {/* subcategory error message */}
              <p
                className={`text-xs text-rose-400 ${
                  errors.subcategory ? 'visible' : 'invisible'
                }`}
              >
                {t('product-sub-category-input-error')}
              </p>
            </div>
          </div>
          {/* Product Description */}
          <label className='mb-2 dark:text-gray-300'>
            {t('product-description')} :
          </label>
          <div className='mb-5 flex h-40 flex-col rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
            <ReactQuill
              theme='snow'
              value={description}
              onChange={setDescription}
              style={{
                height: 100,
                maxHeight: 100,
              }}
            />
            {/* description error message */}
            <p
              className={`text-xs text-rose-400 ${
                errors.description ? 'visible' : 'invisible'
              }`}
            >
              {t('product-description-input-error')}
            </p>
          </div>
          {/* Product Image */}
          <div className='flex flex-col lg:hidden'>
            <label className='mb-2 dark:text-gray-300'>
              {t('product-image')} :
            </label>
            <input
              type='file'
              className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              onChange={handleImageChange}
            />
            <div className='mt-3 flex h-auto max-h-52 w-full flex-wrap items-center justify-start overflow-y-auto'>
              {images.map((image, index) => (
                <div className='relative mb-2 mr-1 h-20 w-20' key={index}>
                  <span
                    className='absolute -end-2 -top-[2px] z-50 cursor-pointer text-xl text-axLightPurple dark:text-violet-400'
                    onClick={() => deleteImage(index)}
                  >
                    &times;
                  </span>
                  <Image
                    className='rounded-md object-cover'
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    fill
                    sizes='80px'
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
            type='submit'
            className='w-full rounded bg-purple-700 py-2 text-white hover:bg-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800'
          >
            {t('update-product')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPopUp;
