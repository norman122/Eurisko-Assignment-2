import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../api/users';
import { useAuthStore } from '../../store/authentication';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from '../modals/confirmationModal';
import { useThemeStore } from '../../store/theme';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
};

const UserCard: React.FC<{ user: User }> = ({ user }) => {
  const { darkMode } = useThemeStore();
  const accessToken = useAuthStore((state) => state.accessToken);
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id, accessToken!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] }); 
      toast.success('User deleted successfully');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const handleDelete = () => {
    setModalOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(user.id);
    setModalOpen(false);
  };

  const cancelDelete = () => {
    setModalOpen(false);
  };

  return (
    <div className={`p-4 rounded shadow-md ${darkMode ? 'bg-gray-400' : 'bg-white'}`}>
      <div className="flex items-center justify-center mb-4 ">
        <div className={`rounded-full w-12 h-12 flex items-center justify-center text-xl text-white ${darkMode ? 'bg-primary-dark' : 'bg-primary'}`}>
          {`${user.firstName && user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`}
        </div>
      </div>
      <div className="flex flex-col items-start space-y-0 w-max">
        <h2 className={`text-l font-semibold text-black`}>{user.firstName} {user.lastName}</h2>
        <p className={`text-black`}>Email: {user.email}</p>
        <p className={`text-sm text-black`}>Status: {user.status}</p>
        <p className={`text-sm text-black`}>Date of Birth: {user.dob}</p>
      </div>
      <div className="flex justify-end mt-4 ">
        <button 
        className={`border-primary rounded px-4 py-2 mr-2 cursor-pointer ${darkMode ? 'text-white bg-primary-dark' : 'text-white bg-primary'}`}
        onClick={() => window.location.href=`/dashboard/edit/${user.id}`}>
          Edit
        </button>
        <button 
          onClick={handleDelete}
          className={`border-red-500 rounded px-4 py-2 cursor-pointer ${darkMode ? 'text-white bg-red-700' : 'text-white bg-red-500'}`}
        >
          Delete
        </button>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to delete ${user.firstName} ${user.lastName}?`}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export { UserCard };
