import { addNewOrderApi, getAllOrdersApi } from '@/src/api/orders/orders.api';
import {
  AddNewOrderParamsType,
  AllOrdersType,
  GetOrdersParamsType,
} from '@/src/api/orders/orders.type';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
