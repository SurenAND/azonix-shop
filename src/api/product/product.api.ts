import { req } from "@/src/api/api.config";
import {
  GetProductsParamsType,
  ProductType,
} from "@/src/api/product/product.type";

export const getAllProductsApi = async (params: GetProductsParamsType) => {
  const _params: any = {};
  if (params.page) _params.page = params.page;
  if (params.category) _params.category = params.category;

  const response = await req.get("/products", { params: _params });
  return response.data;
};

export const updateProductApi = async (product: ProductType, data: any) => {
  const response = await req.patch(`/products/${product._id}`, data);
  return response.data;
};

export const addProductApi = async (product: FormData) => {
  const response = await req.post("/products", product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
