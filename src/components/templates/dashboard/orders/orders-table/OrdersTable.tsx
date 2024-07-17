import { OrderType } from "@/src/api/orders/orders.type";
import { useTranslation } from "react-i18next";
import { BsClipboard2CheckFill } from "react-icons/bs";

export const OrdersTable = ({
  list,
  onFilteredList,
}: {
  list: OrderType[];
  onFilteredList: (e: string) => void;
}) => {
  const { t } = useTranslation();
  const showOrdersInfo = (id: string) => {};

  return (
    <table className="self-start border border-collapse rounded w-full text-center">
      <thead className="select-none">
        <tr className="bg-gray-500 text-white dark:text-black flex flex-col mb-4 sm:table-row">
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            {t("user-name")}
          </th>
          <th className="border text-md w-full md:w-[25%] px-1 py-3">
            {t("total-price")}
          </th>
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            <select
              name="category"
              className="bg-gray-500 text-center w-full outline-none"
              onChange={(e) => onFilteredList(e.target.value)}
            >
              <option className="hidden">{t("order-time")}</option>
              <option value="desc">{t("newest")}</option>
              <option value="asc">{t("oldest")}</option>
            </select>
          </th>
          <th className="border text-md w-full md:w-[15%] px-1 py-3">
            {t("review")}
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: OrderType, index: number) => {
          return (
            <tr
              key={item._id}
              className={`flex flex-col mb-4 sm:table-row ${
                Math.floor(index % 2) !== 0 ? "bg-gray-400 text-white" : ""
              } ${Math.floor(index % 2) !== 0 ? "dark:text-black" : ""}`}
            >
              <td className="p-1 border truncate">
                {item.user.firstname} {item.user.lastname}
              </td>
              <td className="p-1 border truncate">
                {item.totalPrice.toLocaleString("en")}
              </td>
              <td className="p-1 border truncate">
                {new Date(item.createdAt).toLocaleDateString("en")}
              </td>
              <td className="p-1 border truncate">
                <div className="flex justify-center">
                  <BsClipboard2CheckFill
                    width="20"
                    color="#525252"
                    onClick={() => showOrdersInfo(item._id)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
