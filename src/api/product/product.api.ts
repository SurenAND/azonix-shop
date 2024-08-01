import { req } from '@/src/api/api.config';
import {
  GetProductsParamsType,
  ProductType,
} from '@/src/api/product/product.type';

export const getAllProductsApi = async (params: GetProductsParamsType) => {
  const _params: any = {};
  if (params.page) _params.page = params.page;
  if (params.category) _params.category = params.category;
  if (params.limit) _params.limit = params.limit;
  if (params.minPrice)
    _params.price = { ..._params.price, ['gte']: params.minPrice };
  if (params.maxPrice)
    _params.price = { ..._params.price, ['lt']: params.maxPrice };
  if (params.subcategory) _params.subcategory = params.subcategory;
  if (params.sort) _params.sort = params.sort;

  const response = await req.get('/products', { params: _params });
  return response.data;
};

export const updateProductApi = async (product: ProductType, data: any) => {
  const response = await req.patch(`/products/${product._id}`, data);
  return response.data;
};

export const addProductApi = async (product: FormData) => {
  const response = await req.post('/products', product, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteProductApi = async (id: string) => {
  const response = await req.delete(`/products/${id}`);
  return response.data;
};

export const getProductByIdApi = async (productId: string) => {
  const response = await req.get(`/products/${productId}`);
  return response.data;
};
