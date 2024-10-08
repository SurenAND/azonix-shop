import {
  getAllCategoriesApi,
  getAllSubCategoriesApi,
} from '@/src/api/category/category.api';
import {
  AllCategoriesType,
  AllSubCategoriesType,
  GetCategoriesParamsType,
  GetSubCategoriesParamsType,
} from '@/src/api/category/category.type';
import { useQuery } from '@tanstack/react-query';

export const useGetCategories = (params?: GetCategoriesParamsType) => {
  return useQuery<AllCategoriesType>({
    queryKey: ['categories'],
    queryFn: () => getAllCategoriesApi(params),
  });
};

export const useGetSubCategories = (params: GetSubCategoriesParamsType) => {
  return useQuery<AllSubCategoriesType>({
    queryKey: ['subcategories', params],
    queryFn: () => getAllSubCategoriesApi(params),
  });
};
