import { req } from "@/src/api/api.config";
import { GetProductsParamsType } from "@/src/api/product/product.type";

export const getAllProducts = async (params: GetProductsParamsType) => {
  const _params: any = {};
  if (params.page) _params.page = params.page;
  if (params.category) _params.category = params.category;

  const response = await req.get("/products", { params: _params });
  return response.data;
};
