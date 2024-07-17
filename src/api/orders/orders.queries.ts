import { getAllOrdersApi } from "@/src/api/orders/orders.api";
import {
  AllOrdersType,
  GetOrdersParamsType,
} from "@/src/api/orders/orders.type";
import { useQuery } from "react-query";

export const useGetOrders = (params: GetOrdersParamsType) => {
  return useQuery<AllOrdersType>({
    queryKey: ["orders"],
    queryFn: () => getAllOrdersApi(params),
  });
};
