import { UserDataType } from "@/src/api/auth/auth.type";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { MdDelete, MdEdit } from "react-icons/md";

type UsersTableProps = {
  list: UserDataType[];
  idToDelete: MutableRefObject<string>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
};

export const UsersTable = ({
  list,
  idToDelete,
  setOpenDelete,
}: UsersTableProps) => {
  const { t } = useTranslation();

  const setDeleteUserModal = (id: string) => {
    idToDelete.current = id;
    setOpenDelete(true);
  };

  const setEditUserModal = (id: string) => {};

  return (
    <table className="self-start border border-collapse rounded w-full text-center">
      <thead className="select-none">
        <tr className="bg-gray-500 text-white dark:text-black flex flex-col mb-4 sm:table-row">
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            {t("firstname")}
          </th>
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            {t("lastname")}
          </th>
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            {t("username")}
          </th>
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            {t("phone-number")}
          </th>
          <th className="border text-md w-full md:w-[20%] px-1 py-3">
            {t("delete-edit")}
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((user, index) => {
          return (
            <tr
              key={user._id}
              className={`flex flex-col mb-4 sm:table-row ${
                Math.floor(index % 2) !== 0 ? "bg-gray-400 text-white" : ""
              } ${Math.floor(index % 2) !== 0 ? "dark:text-black" : ""}`}
            >
              <td className="p-1 border truncate">{user?.firstname}</td>
              <td className="p-1 border truncate">{user?.lastname}</td>
              <td className="p-1 border truncate">{user?.username}</td>
              <td className="p-1 border truncate">{user?.phoneNumber}</td>
              <td className="p-1 border">
                <div className="flex items-center justify-center gap-4 select-none">
                  <MdDelete
                    className="cursor-pointer w-5"
                    onClick={() => setDeleteUserModal(user._id)}
                  />
                  <MdEdit
                    className="cursor-pointer w-5"
                    onClick={() => setEditUserModal(user._id)}
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
