import { req } from '@/src/api/api.config';
import {
  AddNewOrderParamsType,
  GetOrdersByUserIdParamsType,
  GetOrdersParamsType,
  OrderType,
} from '@/src/api/orders/orders.type';

export const getAllOrdersApi = async (params: GetOrdersParamsType) => {
  const _params: Partial<GetOrdersParamsType> = {};
  if (params.page) _params.page = params.page;
  if (params.deliveryStatus === false) _params.deliveryStatus = 'false';
  if (params.deliveryStatus === true) _params.deliveryStatus = 'true';
  if (params.sort === 'asc') _params.sort = 'deliveryDate';
  if (params.sort === 'desc') _params.sort = '-deliveryDate';

  const response = await req.get('/orders?limit=15', { params: _params });
  return response.data;
};

export const addNewOrderApi = async (data: AddNewOrderParamsType) => {
  const response = await req.post('/orders', data);
  return response.data;
};

export const getOrderByIdApi = async (orderId: string) => {
  const response = await req.get(`/orders/${orderId}`);
  return response.data;
};

export const updateOrderApi = async (
  order: OrderType,
  data: Partial<OrderType>,
) => {
  const response = await req.patch(`/orders/${order._id}`, data);
  return response.data;
};

export const getOrdersByUserIdApi = async (
  userId: string,
  params: GetOrdersByUserIdParamsType,
) => {
  const _params: Partial<GetOrdersParamsType> = {};
  if (params.sort === 'asc') _params.sort = 'deliveryDate';
  if (params.sort === 'desc') _params.sort = '-deliveryDate';

  const response = await req.get(`/orders?limit=all&user[_id]=${userId}`, {
    params: _params,
  });
  return response.data;
};
