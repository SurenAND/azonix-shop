import DragDropImageUploader from '@/src/components/shared/dragdrop-image-uploader/DragDropImageUploader';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTimes } from 'react-icons/fa';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';
import { useProductStore } from '@/src/store/product/product.store';
import { useCategoryStore } from '@/src/store/category/category.store';
import type { ProductType } from '@/src/api/product/product.type';
import type { CategoryType, SubCategoryType } from '@/src/api/category/category.type';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type EditModalProps = {
  openEdit: boolean;
  onClose: () => void;
  idToEdit: string;
  setIdToEdit: Dispatch<SetStateAction<string>>; // To clear it after successful edit
};

const EditPopUp = ({
  openEdit,
  onClose,
  idToEdit,
  setIdToEdit,
}: EditModalProps) => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm();

  // Local state for images (URLs for existing, File objects for new - simplified to string URLs)
  const [currentImageUrls, setCurrentImageUrls] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');


  // Product Store
  const {
    product: productToEdit, // This is the product being edited, fetched by ID
    fetchProductById,
    updateProduct: storeUpdateProduct,
    loading: productLoading,
    // error: productError // TODO: Display this error if fetching product fails
  } = useProductStore((state) => ({
    product: state.product,
    fetchProductById: state.fetchProductById,
    updateProduct: state.updateProduct,
    loading: state.loading,
    error: state.error
  }));

  // Category Store
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

  const formSelectedCategoryId = watch('category');

  // Fetch product details when idToEdit changes
  useEffect(() => {
    if (idToEdit) {
      fetchProductById(idToEdit);
    }
  }, [idToEdit, fetchProductById]);

  // Populate form when productToEdit is loaded from store
  useEffect(() => {
    if (productToEdit && productToEdit._id === idToEdit) {
      reset({
        name: productToEdit.name || '',
        price: productToEdit.price || 0,
        discountPercentage: productToEdit.discountPercentage || 0,
        quantity: productToEdit.quantity || 0,
        brand: productToEdit.brand || '',
        category: productToEdit.category?._id || '',
        subcategory: productToEdit.subcategory?._id || '',
      });
      setDescription(productToEdit.description || '');
      setCurrentImageUrls(productToEdit.images || []);
      setSelectedCategoryId(productToEdit.category?._id || '');
    }
  }, [productToEdit, idToEdit, reset]);

  // Fetch all categories if not available
  useEffect(() => {
    if (categories.length === 0) {
      fetchAllCategories();
    }
  }, [categories, fetchAllCategories]);

  // Fetch subcategories when selectedCategoryId (from form or product) changes
  useEffect(() => {
    const categoryIdToFetch = formSelectedCategoryId || selectedCategoryId;
    if (categoryIdToFetch) {
      fetchSubcategoriesByCategory({ category: categoryIdToFetch });
    }
  }, [formSelectedCategoryId, selectedCategoryId, fetchSubcategoriesByCategory]);


  // Image handling (simplified: manage string URLs, no new File uploads for local store)
  const handleDeleteExistingImage = (urlToRemove: string) => {
    setCurrentImageUrls((prev) => prev.filter(url => url !== urlToRemove));
  };

  const handleForm = (data: FieldValues) => {
    const selectedCatObj = categories.find(c => c._id === data.category);
    const selectedSubCatObj = currentCategorySubcategories.find(sc => sc._id === data.subcategory);

    if (!selectedCatObj || !selectedSubCatObj) {
      toast.error(t('category_or_subcategory_not_found_error', {ns: 'common'}));
      return;
    }

    const updatedProductData: Partial<ProductType> = {
      name: data.name,
      price: parseFloat(data.price),
      discountPercentage: parseInt(data.discountPercentage, 10),
      quantity: parseInt(data.quantity, 10),
      brand: data.brand,
      category: selectedCatObj,
      subcategory: selectedSubCatObj,
      description: description,
      images: currentImageUrls, // Use the managed list of URLs
      // Thumbnail can be derived from images by the store if needed, or set explicitly
      thumbnail: currentImageUrls.length > 0 ? currentImageUrls[0] : '',
    };

    storeUpdateProduct(idToEdit, updatedProductData);
    toast.success(t('product_updated_successfully', { ns: 'common' }));
    onClose(); // Close modal on success
    setIdToEdit(''); // Clear ID
  };

  if (!openEdit) return null;

  if (productLoading && !productToEdit) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded-xl dark:bg-gray-800">Loading product...</div>
        </div>
      );
  }


  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-colors ${
        openEdit ? 'visible bg-black/30' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex max-h-[95vh] w-2/3 flex-col items-center justify-start overflow-y-auto rounded-xl bg-white p-6 text-start shadow transition-all dark:bg-gray-800 lg:w-1/2 ${
          openEdit ? 'scale-100 opacity-100' : 'scale-125 opacity-0'
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
                  pattern: {value: /^\d+(\.\d{1,2})?$/, message: t('validation_number_pattern', {ns: 'common'})}
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
                  pattern: {value: /^[0-9]+$/, message: t('validation_number_pattern', {ns: 'common'})}
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
                  pattern: {value: /^[0-9]+$/, message: t('validation_number_pattern', {ns: 'common'})}
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
                // value={selectedCategoryId} // Controlled by react-hook-form register
                // onChange={(e) => setSelectedCategoryId(e.target.value)} // Handled by watch
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
          {/* Product Image Management for existing images (URLs) */}
          <label className='mb-2 dark:text-gray-300'>
            {t('product-images-current')} :
          </label>
          <div className='flex flex-wrap gap-2 border p-2 rounded dark:border-gray-600'>
            {currentImageUrls.map((url, index) => (
              <div key={index} className="relative h-20 w-20">
                <Image src={`http://${url}`} alt={`Product image ${index + 1}`} layout="fill" className="object-cover rounded" />
                <button
                  type="button"
                  onClick={() => handleDeleteExistingImage(url)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                >
                  X
                </button>
              </div>
            ))}
            {currentImageUrls.length === 0 && <p className="text-xs text-gray-500">{t('no_images_available', {ns: 'common'})}</p>}
          </div>
          {/* Image upload for new images is disabled for local store as File objects are not persisted. */}
          {/* If this were a real backend, DragDropImageUploader for new files would be here. */}
          <div className="my-2 p-2 border border-dashed border-gray-400 rounded dark:border-gray-600">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('image_upload_disabled_local', {ns: 'common'})}
            </p>
          </div>

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
