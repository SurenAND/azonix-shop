import Loading from '@/src/components/shared/loading/Loading';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import 'react-quill/dist/quill.snow.css';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store';
import type { ProductType } from '@/src/api/product/product.type'; // For product type used in addProduct
import type { CategoryType, SubCategoryType } from '@/src/api/category/category.type';
import { toast } from 'sonner';


// dynamic import components
const DragDropImageUploader = dynamic(
  () =>
    import(
      '@/src/components/shared/dragdrop-image-uploader/DragDropImageUploader'
    ),
);
const MyFileInput = dynamic(
  () => import('@/src/components/shared/file-input/FileInput'),
);
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

function AddProduct() {
  // libraries
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch, // To watch category changes for subcategory update
  } = useForm();

  // states
  const [localImages, setLocalImages] = useState<File[]>([]); // Renamed to avoid conflict
  const [description, setDescription] = useState<string>('');
  // const [productCategory, setProductCategory] = useState<string>(''); // Now derived from form or store

  // Zustand Stores
  const { addProduct: storeAddProduct } = useProductStore((state) => ({ // Renamed to avoid conflict
    addProduct: state.addProduct,
  }));
  const {
    categories,
    currentCategorySubcategories,
    fetchAllCategories,
    fetchSubcategoriesByCategory
  } = useCategoryStore((state) => ({
    categories: state.categories, // Use the main categories list
    currentCategorySubcategories: state.currentCategorySubcategories,
    fetchAllCategories: state.fetchAllCategories,
    fetchSubcategoriesByCategory: state.fetchSubcategoriesByCategory,
  }));

  const selectedCategoryId = watch('category');

  useEffect(() => {
    if (categories.length === 0) {
      fetchAllCategories(); // Fetch all categories if not already present
    }
  }, [categories, fetchAllCategories]);

  useEffect(() => {
    if (selectedCategoryId) {
      fetchSubcategoriesByCategory({ category: selectedCategoryId });
    }
  }, [selectedCategoryId, fetchSubcategoriesByCategory]);


  // functions
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
    // Find full category and subcategory objects
    const selectedCategoryObj = categories.find(c => c._id === data.category) as CategoryType | undefined;
    const selectedSubCategoryObj = currentCategorySubcategories.find(sc => sc._id === data.subcategory) as SubCategoryType | undefined;

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
      // Images are not handled by local store; pass empty or placeholder strings
      thumbnail: '', // e.g., localImages.length > 0 ? 'placeholder.jpg' : ''
      images: [],    // e.g., localImages.map(f => 'placeholder.jpg')
    };

    storeAddProduct(newProductData);
    toast.success(t('product_added_successfully', {ns: 'common'}));
    reset();
    setLocalImages([]);
    setDescription('');
  }

  return (
    <div className='flex min-h-screen w-2/3 select-none flex-col items-center justify-center space-y-5'>
      <h4 className='text-4xl font-black uppercase dark:text-white'>
        {t('add-product')}
      </h4>
      <div className='w-full max-w-3xl rounded bg-white p-6 shadow-md dark:bg-gray-800'>
        <form
          onSubmit={handleSubmit(handleForm)}
          className='grid grid-cols-1 gap-4'
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
                type='number' // Changed to number
                step="0.01" // For decimal prices
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
                type='number' // Changed to number
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
                type='number' // Changed to number
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
                // onChange is handled by watch('category') for subcategory fetching
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
            {selectedCategoryId && (
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
            )}
          </div>
          {/* Product Description */}
          <label className='mb-2 dark:text-gray-300'>
            {t('product-description')} :
          </label>
          <div className='mb-5 flex h-40 flex-col rounded border p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white'>
            <Suspense fallback={<Loading />}>
              <ReactQuill
                theme='snow'
                value={description}
                onChange={setDescription}
                style={{
                  height: 100,
                  maxHeight: 100,
                }}
                modules={{ toolbar: [[{ 'header': [1, 2, 3, false] }], ['bold', 'italic', 'underline']] }}
              />
            </Suspense>
            {/* Description validation can be added here if needed */}
          </div>
          {/* Product Image */}
          <div className='flex flex-col lg:hidden'>
            <label className='mb-2 dark:text-gray-300'>
              {t('product-image-limit')} :
            </label>
            <Suspense fallback={<Loading />}>
              <MyFileInput changeHandler={handleImageChange} />
            </Suspense>
          </div>
          <Suspense fallback={<Loading />}>
            <DragDropImageUploader
              images={localImages}
              setImages={setLocalImages}
              deleteImage={deleteImage}
            />
          </Suspense>
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
}

export default AddProduct;
