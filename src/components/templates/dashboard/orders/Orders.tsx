import { useGetOrders } from "@/src/api/orders/orders.queries";
import { EmptyList } from "@/src/components/shared/empty-list/EmptyList";
import Pagination from "@/src/components/shared/pagination/Pagination";
import { OrdersTable } from "@/src/components/templates/dashboard/orders/orders-table/OrdersTable";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";

export const Orders = () => {
  const { t } = useTranslation();
  const [isDelivered, setIsDelivered] = useState(false);
  const [sortDate, setSortDate] = useState("desc");
  const [page, setPage] = useState(1);

  const { data: orders, refetch } = useGetOrders({
    page,
    sort: sortDate,
    delivered: isDelivered,
  });

  useEffect(() => {
    refetch();
  }, [page, sortDate, isDelivered]);

  const filteredList = (text: string) => {
    setSortDate(text);
    setPage(1);
  };

  const deliverHandler = (deliver: boolean) => {
    setIsDelivered(deliver);
    setPage(1);
  };

  return (
    <main className="p-3 min-h-screen w-full md:w-[780px]">
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{t("orders-management")}</h1>
        <div className="flex gap-2">
          <div
            className="flex items-center gap-1 border-l border-[#afafaf50] px-2"
            onClick={() => deliverHandler(false)}
          >
            {isDelivered ? (
              <MdRadioButtonUnchecked color="#5e35b0" />
            ) : (
              <MdRadioButtonChecked color="#5e35b0" />
            )}
            <span>{t("pending-delivery")}</span>
          </div>
          <div
            className="flex items-center gap-1"
            onClick={() => deliverHandler(true)}
          >
            {isDelivered ? (
              <MdRadioButtonChecked color="#5e35b0" />
            ) : (
              <MdRadioButtonUnchecked color="#5e35b0" />
            )}
            <span>{t("delivered")}</span>
          </div>
        </div>
      </header>

      <div className="px-3 py-8 w-full md:w-[760px] min-h-[calc(100vh-100px)] mx-auto flex items-center sm:justify-center">
        {orders &&
        orders.status === "success" &&
        orders.data.orders.length === 0 ? (
          <EmptyList />
        ) : (
          <OrdersTable
            list={orders?.data.orders || []}
            onFilteredList={filteredList}
          />
        )}
      </div>
      {orders && (
        <Pagination
          page={page}
          totalPages={orders.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
    </main>
  );
};
