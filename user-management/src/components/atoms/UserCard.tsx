import React from 'react';
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
        <button className={`border-primary rounded px-4 py-2 mr-2 cursor-pointer ${darkMode ? 'text-white bg-primary-dark' : 'text-white bg-primary'}`}>Edit</button>
        <button className={`border-red-500 rounded px-4 py-2 cursor-pointer ${darkMode ? 'text-white bg-red-700' : 'text-white bg-red-500'}`}>Delete</button>
      </div>
    </div>
  );
};

export { UserCard };
