import {
  getAllProductsApi,
  updateProductApi,
} from "@/src/api/product/product.api";
import {
  AllProductsType,
  GetProductsParamsType,
  ProductType,
} from "@/src/api/product/product.type";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useGetProducts = (params: GetProductsParamsType) => {
  return useQuery<AllProductsType>({
    queryKey: ["products"],
    queryFn: () => getAllProductsApi(params),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      newProduct,
      data,
    }: {
      newProduct: ProductType;
      data: any;
    }) => updateProductApi(newProduct, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
