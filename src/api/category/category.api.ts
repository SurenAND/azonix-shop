import { req } from "@/src/api/api.config";
import { GetSubCategoriesParamsType } from "@/src/api/category/category.type";

export const getAllCategoriesApi = async () => {
  const response = await req.get("/categories");
  return response.data;
};

export const getAllSubCategoriesApi = async (
  params: GetSubCategoriesParamsType
) => {
  const _params: any = {};
  if (params.category) _params.category = params.category;

  const response = await req.get("/subcategories", { params: _params });
  return response.data;
};
