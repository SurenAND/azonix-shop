import {
  getAllCategoriesApi,
  getAllSubCategoriesApi,
} from "@/src/api/category/category.api";
import {
  AllCategoriesType,
  AllSubCategoriesType,
  GetSubCategoriesParamsType,
} from "@/src/api/category/category.type";
import { useQuery } from "react-query";

export const useGetCategories = () => {
  return useQuery<AllCategoriesType>({
    queryKey: ["categories"],
    queryFn: () => getAllCategoriesApi(),
  });
};

export const useGetSubCategories = (params: GetSubCategoriesParamsType) => {
  return useQuery<AllSubCategoriesType>({
    queryKey: ["subcategories"],
    queryFn: () => getAllSubCategoriesApi(params),
  });
};
