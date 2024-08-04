import { ProductType } from '@/src/api/product/product.type';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

type EditableTdProps = {
  product: ProductType;
  field: string;
  editedProducts: Record<string, Partial<ProductType>>;
  setEditedProducts: React.Dispatch<
    React.SetStateAction<Record<string, Partial<ProductType>>>
  >;
};

function EditableTd({
  product,
  field,
  editedProducts,
  setEditedProducts,
}: EditableTdProps) {
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const getValue = () => {
    return (editedProducts[product._id]?.[field as keyof ProductType] ??
      product[field as keyof ProductType]) as number;
  };

  const isEdited = () => {
    const editKey =
      `is${field.charAt(0).toUpperCase() + field.slice(1)}Edit` as keyof Partial<ProductType>;
    return editedProducts[product._id]?.[editKey] ?? false;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsEdit(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (value: number) => {
    setEditedProducts((prev) => ({
      ...prev,
      [product._id]: {
        ...prev[product._id],
        [field]: value,
        [`is${field.charAt(0).toUpperCase() + field.slice(1)}Edit`]: true,
      },
    }));
  };

  const handleBlur = () => {
    setIsEdit(false);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setIsEdit(false);
      handleChange(product[field as keyof ProductType] as number);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      handleChange(Number(value));
    } else {
      e.preventDefault();
      toast.error(t('error-invalid-number'));
    }
  };

  const renderInput = () => (
    <input
      className='w-full text-center font-bold text-black'
      ref={inputRef}
      value={getValue()}
      onChange={handleInputChange}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
    />
  );

  const renderSpan = () => (
    <span
      className={`block p-1 ${isEdited() ? 'bg-axLightPurple/60 text-white' : ''}`}
    >
      {getValue()}
    </span>
  );

  return (
    <td className='truncate border p-1' onClick={() => setIsEdit(true)}>
      {isEdit ? renderInput() : renderSpan()}
    </td>
  );
}

export default EditableTd;
