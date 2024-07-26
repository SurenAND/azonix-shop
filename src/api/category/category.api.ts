import { req } from '@/src/api/api.config';
import {
  GetCategoriesParamsType,
  GetSubCategoriesParamsType,
} from '@/src/api/category/category.type';

export const getAllCategoriesApi = async (params?: GetCategoriesParamsType) => {
  const _params: any = {};
  if (params?.slugname) _params.slugname = params.slugname;

  const response = await req.get('/categories', { params: _params });
  return response.data;
};

export const getAllSubCategoriesApi = async (
  params: GetSubCategoriesParamsType,
) => {
  const _params: any = {};
  if (params.category) _params.category = params.category;

  const response = await req.get('/subcategories', { params: _params });
  return response.data;
};
