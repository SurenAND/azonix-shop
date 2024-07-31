import { req } from '@/src/api/api.config';
import { GetOrdersParamsType, OrderType } from '@/src/api/orders/orders.type';

export const getAllOrdersApi = async (params: GetOrdersParamsType) => {
  const _params: any = {};
  if (params.page) _params.page = params.page;
  if (params.delivered === false) _params.deliveryStatus = 'false';
  if (params.delivered === true) _params.deliveryStatus = 'true';
  if (params.sort === 'asc') _params.sort = 'createdAt';
  if (params.sort === 'desc') _params.sort = '-createdAt';

  const response = await req.get('/orders', { params: _params });
  return response.data;
};

export const addNewOrderApi = async (data: any) => {
  const response = await req.post('/orders', data);
  return response.data;
};

export const getOrderByIdApi = async (orderId: string) => {
  const response = await req.get(`/orders/${orderId}`);
  return response.data;
};

export const updateOrderApi = async (order: OrderType, data: any) => {
  const response = await req.patch(`/orders/${order._id}`, data);
  return response.data;
};
