import { useDeleteUser, useGetUsers } from '@/src/api/auth/auth.queries';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Pagination from '@/src/components/shared/pagination/Pagination';
import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const DeletePopUp = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/modals/delete/Delete'
    ),
);
const EditPopUp = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/modals/edit/Edit'
    ),
);
const UsersTable = lazy(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/users-table/UserTable'
    ),
);

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
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
      {users && (
        <Pagination
          page={page}
          totalPages={users.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </main>
  );
}

export default UsersManager;
