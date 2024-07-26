import { useDeleteUser, useGetUsers } from '@/src/api/auth/auth.queries';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Pagination from '@/src/components/shared/pagination/Pagination';
import DeletePopUp from '@/src/components/templates/dashboard/user-manager/users/modals/delete/Delete';
import EditPopUp from '@/src/components/templates/dashboard/user-manager/users/modals/edit/Edit';
import { UsersTable } from '@/src/components/templates/dashboard/user-manager/users/users-table/UserTable';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

function UsersManager() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const { data: users, refetch } = useGetUsers({
    page,
    role: 'USER',
  });

  const { mutate: deleteUser } = useDeleteUser();

  const [openDelete, setOpenDelete] = useState(false);
  const idToDelete = useRef<string>('');

  const [openEdit, setOpenEdit] = useState(false);
  const [idToEdit, setIdToEdit] = useState<string>('');

  const handleDelete = (id: string) => {
    deleteUser(id);
    toast.success(t('user-delete-success'));
  };

  useEffect(() => {
    refetch();
  }, [page]);

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      <header className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>{t('user-manager')}</h1>
      </header>
      <div className='mx-auto flex min-h-[calc(100vh-100px)] w-full items-center px-3 py-8 sm:justify-center md:w-[760px]'>
        {users &&
        users.status === 'success' &&
        users.data.users.length === 0 ? (
          <EmptyList />
        ) : (
          <UsersTable
            list={users?.data.users || []}
            idToDelete={idToDelete}
            setOpenDelete={setOpenDelete}
            setIdToEdit={setIdToEdit}
            setOpenEdit={setOpenEdit}
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
      <EditPopUp
        openEdit={openEdit}
        onClose={() => setOpenEdit(false)}
        idToEdit={idToEdit}
        setIdToEdit={setIdToEdit}
      />
    </main>
  );
}

export default UsersManager;
