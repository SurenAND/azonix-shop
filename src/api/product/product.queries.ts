import {
  addProductApi,
  deleteProductApi,
  getAllProductsApi,
  updateProductApi,
} from "@/src/api/product/product.api";
import {
  AllProductsType,
  GetProductsParamsType,
  ProductType,
} from "@/src/api/product/product.type";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

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

export const useAddProduct = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newProduct: FormData) => addProductApi(newProduct),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      if (data.status === "success") {
        toast.success(t("product-add-success"));
      }
      if (data.status === "fail") {
        toast.error(data.message);
      }
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProductApi(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
