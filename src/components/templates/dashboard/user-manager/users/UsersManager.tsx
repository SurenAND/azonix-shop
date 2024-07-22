import { useDeleteUser, useGetUsers } from "@/src/api/auth/auth.queries";
import { EmptyList } from "@/src/components/shared/empty-list/EmptyList";
import Pagination from "@/src/components/shared/pagination/Pagination";
import DeletePopUp from "@/src/components/templates/dashboard/user-manager/users/modals/delete/Delete";
import { UsersTable } from "@/src/components/templates/dashboard/user-manager/users/users-table/UserTable";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

function UsersManager() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data: users, refetch } = useGetUsers({
    page,
    role: "USER",
  });

  const { mutate: deleteUser } = useDeleteUser();

  const [openDelete, setOpenDelete] = useState(false);
  const idToDelete = useRef<string>("");

  const handleDelete = (id: string) => {
    deleteUser(id);
    toast.success(t("user-delete-success"));
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <main className="p-3 min-h-screen w-full md:w-[780px]">
      <header className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{t("user-manager")}</h1>
      </header>
      <div className="px-3 py-8 w-full md:w-[760px] min-h-[calc(100vh-100px)] mx-auto flex items-center sm:justify-center">
        {users &&
        users.status === "success" &&
        users.data.users.length === 0 ? (
          <EmptyList />
        ) : (
          <UsersTable
            list={users?.data.users || []}
            idToDelete={idToDelete}
            setOpenDelete={setOpenDelete}
          />
        )}
      </div>
      {users && (
        <Pagination
          page={page}
          totalPages={users.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
      <DeletePopUp
        openDelete={openDelete}
        onClose={() => setOpenDelete(false)}
        action={() => handleDelete(idToDelete.current)}
        idToDelete={idToDelete.current}
      />
    </main>
  );
}

export default UsersManager;
