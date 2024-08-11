import { UserDataType } from '@/src/api/auth/auth.type';
import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDelete, MdEdit } from 'react-icons/md';

type UsersTableProps = {
  list: UserDataType[];
  idToDelete: MutableRefObject<string>;
  setOpenDelete: Dispatch<SetStateAction<boolean>>;
  setIdToEdit: Dispatch<SetStateAction<string>>;
  setOpenEdit: Dispatch<SetStateAction<boolean>>;
};

const UsersTable = ({
  list,
  idToDelete,
  setOpenDelete,
  setIdToEdit,
  setOpenEdit,
}: UsersTableProps) => {
  // libraries
  const { t } = useTranslation();

  // functions
  const setDeleteUserModal = (id: string) => {
    idToDelete.current = id;
    setOpenDelete(true);
  };

  const setEditUserModal = (id: string) => {
    setIdToEdit(id);
    setOpenEdit(true);
  };

  return (
    <table className='w-full border-collapse self-start rounded border text-center'>
      <thead className='select-none'>
        <tr className='mb-4 flex flex-col bg-gray-500 text-white dark:text-black sm:table-row'>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            {t('firstname')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            {t('lastname')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            {t('username')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            {t('phone-number')}
          </th>
          <th className='text-md w-full border px-1 py-3 md:w-[20%]'>
            {t('delete-edit')}
          </th>
        </tr>
      </thead>
      <tbody>
        {list.map((user, index) => {
          return (
            <tr
              key={user._id}
              className={`mb-4 flex flex-col sm:table-row ${
                Math.floor(index % 2) !== 0 ? 'bg-gray-400 text-white' : ''
              } ${Math.floor(index % 2) !== 0 ? 'dark:text-black' : ''}`}
            >
              {/* firstname */}
              <td className='truncate border p-1'>{user?.firstname}</td>
              {/* lastname */}
              <td className='truncate border p-1'>{user?.lastname}</td>
              {/* username */}
              <td className='truncate border p-1'>{user?.username}</td>
              {/* phone number */}
              <td className='truncate border p-1'>{user?.phoneNumber}</td>
              {/* delete and edit */}
              <td className='border p-1'>
                <div className='flex select-none items-center justify-center gap-4'>
                  <MdDelete
                    className='w-5 cursor-pointer'
                    onClick={() => setDeleteUserModal(user._id)}
                  />
                  <MdEdit
                    className='w-5 cursor-pointer'
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

export default UsersTable;
