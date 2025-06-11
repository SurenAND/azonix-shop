import DragDropImageUploader from '@/src/components/shared/dragdrop-image-uploader/DragDropImageUploader';
import MyFileInput from '@/src/components/shared/file-input/FileInput';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store';
import type { ProductType } from '@/src/api/product/product.type';
import type { CategoryType, SubCategoryType } from '@/src/api/category/category.type';
import { toast } from 'sonner';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type AddModalProps = {
  openAdd: boolean;
  onClose: () => void;
};

const AddPopUp = ({ openAdd, onClose }: AddModalProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

  const [localImages, setLocalImages] = useState<File[]>([]);
  const [description, setDescription] = useState<string>('');

  const { addProduct: storeAddProduct } = useProductStore((state) => ({
    addProduct: state.addProduct,
  }));

  const {
    categories,
    currentCategorySubcategories,
    fetchAllCategories,
    fetchSubcategoriesByCategory
  } = useCategoryStore((state) => ({
    categories: state.categories,
    currentCategorySubcategories: state.currentCategorySubcategories,
    fetchAllCategories: state.fetchAllCategories,
    fetchSubcategoriesByCategory: state.fetchSubcategoriesByCategory,
  }));

  const selectedCategoryId = watch('category');

  useEffect(() => {
    if (openAdd && categories.length === 0) { // Fetch only when modal opens and categories are not loaded
      fetchAllCategories();
    }
  }, [openAdd, categories.length, fetchAllCategories]);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategoriesByCategory({ category: selectedCategoryId });
    }
  }, [selectedCategoryId, fetchSubcategoriesByCategory]);


  const deleteImage = (index: number) => {
    setLocalImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLocalImages((prev) => [...prev, file]);
    }
  };

  function handleForm(data: FieldValues) {
    const selectedCategoryObj = categories.find(c => c._id === data.category);
    const selectedSubCategoryObj = currentCategorySubcategories.find(sc => sc._id === data.subcategory);

    if (!selectedCategoryObj || !selectedSubCategoryObj) {
      toast.error(t('category_or_subcategory_not_found_error', {ns: 'common'}));
      return;
    }

    const newProductData: Omit<ProductType, '_id' | 'slugname' | 'priceAfterDiscount'> = {
      name: data.name,
      price: parseFloat(data.price),
      discountPercentage: parseInt(data.discountPercentage, 10),
      quantity: parseInt(data.quantity, 10),
      brand: data.brand,
      category: selectedCategoryObj,
      subcategory: selectedSubCategoryObj,
      description: description,
      thumbnail: '', // Local store doesn't handle file uploads
      images: [],    // Local store doesn't handle file uploads
    };

    storeAddProduct(newProductData);
    toast.success(t('product_added_successfully', { ns: 'common' }));
    reset();
    setLocalImages([]);
    setDescription('');
    onClose(); // Close modal on success
  }

  if (!openAdd) return null;


  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openAdd ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[95vh] w-2/3 flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-6 text-start shadow transition-all dark:bg-gray-800 lg:w-1/2 ${
          openAdd ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
        }`}
      >
        <button
          onClick={onClose}
          className='absolute end-4 top-4 rounded-lg p-1 text-gray-400 hover:text-red-500 dark:hover:text-white'
        >
          <FaTimes />
        </button>

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
                required: t('validation_required', {ns: 'common', field: t('product-name') }) as string,
              })}
              className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
            />
            {errors.name && <p className="text-xs text-rose-400">{errors.name.message as string}</p>}
          </div>
          <div className='grid grid-cols-3 gap-4'>
            {/* Product Price */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-price')} :
              </label>
              <input
                type='number'
                step="0.01"
                {...register('price', {
                  required: t('validation_required', {ns: 'common', field: t('product-price') }) as string,
                  valueAsNumber: true,
                  pattern: { value: /^\d+(\.\d{1,2})?$/, message: t('validation_number_pattern', {ns: 'common'})}
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {errors.price && <p className="text-xs text-rose-400">{errors.price.message as string}</p>}
            </div>
            {/* Product Discount Percentage */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-discount-percentage')} :
              </label>
              <input
                type='number'
                {...register('discountPercentage', {
                  required: t('validation_required', {ns: 'common', field: t('product-discount-percentage') }) as string,
                  valueAsNumber: true,
                  min: { value: 0, message: t('validation_min_value', {ns: 'common', min: 0 }) },
                  max: { value: 100, message: t('validation_max_value', {ns: 'common', max: 100 }) },
                  pattern: { value: /^[0-9]+$/, message: t('validation_number_pattern', {ns: 'common'})}
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {errors.discountPercentage && <p className="text-xs text-rose-400">{errors.discountPercentage.message as string}</p>}
            </div>
            {/* Product Quantity */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-quantity')} :
              </label>
              <input
                type='number'
                {...register('quantity', {
                  required: t('validation_required', {ns: 'common', field: t('product-quantity') }) as string,
                  valueAsNumber: true,
                  min: {value: 0, message: t('validation_min_value', {ns: 'common', min: 0})},
                  pattern: { value: /^[0-9]+$/, message: t('validation_number_pattern', {ns: 'common'})}
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {errors.quantity && <p className="text-xs text-rose-400">{errors.quantity.message as string}</p>}
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
                  required: t('validation_required', {ns: 'common', field: t('product-brand') }) as string,
                })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              />
              {errors.brand && <p className="text-xs text-rose-400">{errors.brand.message as string}</p>}
            </div>
            {/* Product Category */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-category')} :
              </label>
              <select
                {...register('category', { required: t('validation_required', {ns: 'common', field: t('product-category') }) as string })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
              >
                <option value="">{t('select_category', {ns: 'common'})}</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-xs text-rose-400">{errors.category.message as string}</p>}
            </div>
            {/* Product Sub Category */}
            <div className='flex flex-col'>
              <label className='mb-2 dark:text-gray-300'>
                {t('product-sub-category')} :
              </label>
              <select
                {...register('subcategory', { required: t('validation_required', {ns: 'common', field: t('product-sub-category') }) as string })}
                className='rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                disabled={currentCategorySubcategories.length === 0}
              >
                <option value="">{t('select_subcategory', {ns: 'common'})}</option>
                {currentCategorySubcategories.map((subCategory) => (
                    <option key={subCategory._id} value={subCategory._id}>
                      {subCategory.name}
                    </option>
                  ))}
              </select>
              {errors.subcategory && <p className="text-xs text-rose-400">{errors.subcategory.message as string}</p>}
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
              style={{ height: 100, maxHeight: 100 }}
              modules={{ toolbar: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline']] }}
            />
          </div>
          {/* Product Image */}
          <div className='flex flex-col lg:hidden'>
            <label className='mb-2 dark:text-gray-300'>
              {t('product-image-limit')} :
            </label>
            <MyFileInput changeHandler={handleImageChange} />
          </div>
          <DragDropImageUploader
            images={localImages} // Use localImages state
            setImages={setLocalImages} // Use localImages state
            deleteImage={deleteImage}
          />
          {/* Add Product Button */}
          <button
            type='submit'
            className='w-full rounded bg-purple-700 py-2 text-white hover:bg-purple-800 dark:bg-purple-900 dark:hover:bg-purple-800'
          >
            {t('add-product')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPopUp;
