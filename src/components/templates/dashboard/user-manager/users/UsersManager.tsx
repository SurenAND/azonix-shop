import { useDeleteUser, useGetUsers } from '@/src/api/auth/auth.queries';
import { EmptyList } from '@/src/components/shared/empty-list/EmptyList';
import Loading from '@/src/components/shared/loading/Loading';
import Pagination from '@/src/components/shared/pagination/Pagination';
import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const DeletePopUp = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/modals/delete/Delete'
    ),
);
const EditPopUp = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/modals/edit/Edit'
    ),
);
const UsersTable = dynamic(
  () =>
    import(
      '@/src/components/templates/dashboard/user-manager/users/users-table/UserTable'
    ),
);

function UsersManager() {
  // libraries
  const { t } = useTranslation();

  // states
  const [page, setPage] = useState<number>(1);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const idToDelete = useRef<string>('');
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [idToEdit, setIdToEdit] = useState<string>('');

  // queries
  const { data: users, refetch } = useGetUsers({
    page,
    role: 'USER',
  });

  useEffect(() => {
    refetch();
  }, [page]);

  // mutations
  const { mutate: deleteUser } = useDeleteUser();

  // functions
  const handleDelete = (id: string) => {
    deleteUser(id);
    toast.success(t('user-delete-success'));
  };

  return (
    <main className='min-h-screen w-full p-3 md:w-[780px]'>
      {/* header */}
      <header className='flex items-center justify-between'>
        <h1 className='text-lg font-bold'>{t('user-manager')}</h1>
      </header>
      {/* table */}
      <Suspense fallback={<Loading />}>
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

      {/* pagination */}
      {users && (
        <Pagination
          page={page}
          totalPages={users.total_pages}
          OnSetPage={(pageNo) => setPage(pageNo)}
        />
      )}

      {/* delete popup */}
      <Suspense fallback={<Loading />}>
        <DeletePopUp
          openDelete={openDelete}
          onClose={() => setOpenDelete(false)}
          action={() => handleDelete(idToDelete.current)}
          idToDelete={idToDelete.current}
        />
      </Suspense>

      {/* edit popup */}
      <Suspense fallback={<Loading />}>
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
