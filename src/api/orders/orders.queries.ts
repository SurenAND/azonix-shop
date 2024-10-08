import {
  addNewOrderApi,
  getAllOrdersApi,
  getOrderByIdApi,
  getOrdersByUserIdApi,
  updateOrderApi,
} from '@/src/api/orders/orders.api';
import {
  AddNewOrderParamsType,
  AllOrdersType,
  GetOrdersByUserIdParamsType,
  GetOrdersParamsType,
  OrderType,
  SingleOrderType,
} from '@/src/api/orders/orders.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useGetOrders = (params: GetOrdersParamsType) => {
  return useQuery<AllOrdersType>({
    queryKey: ['orders'],
    queryFn: () => getAllOrdersApi(params),
  });
};

export const useAddNewOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cartData: AddNewOrderParamsType) => addNewOrderApi(cartData),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      if (data.status === 'fail') {
        toast.error(data.message);
      }
    },
  });
};

export const useGetOrderById = (orderId: string) => {
  return useQuery<SingleOrderType>({
    queryKey: ['orders', 'single', orderId],
    queryFn: () => getOrderByIdApi(orderId),
    refetchOnMount: 'always',
    enabled: !!orderId,
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      newOrder,
      data,
    }: {
      newOrder: OrderType;
      data: Partial<OrderType>;
    }) => updateOrderApi(newOrder, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
  });
};

export const useGetOrderByUserId = (
  userId: string,
  params: GetOrdersByUserIdParamsType,
) => {
  return useQuery<AllOrdersType>({
    queryKey: ['orders', 'user', userId],
    queryFn: () => getOrdersByUserIdApi(userId, params),
  });
};
