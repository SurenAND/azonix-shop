import { getAllProducts } from "@/src/api/product/product.api";
import {
  AllProductsType,
  GetProductsParamsType,
} from "@/src/api/product/product.type";
import { useQuery } from "react-query";

export const useGetProducts = (params: GetProductsParamsType) => {
  return useQuery<AllProductsType>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(params),
  });
};
