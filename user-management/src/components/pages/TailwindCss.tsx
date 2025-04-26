import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserCard } from "../atoms/UserCard";
import { useAuthStore } from '../../store/authentication';
import { useThemeStore } from '../../store/theme';
import { getUsers, User } from '../../api/users';

const TailwindCss: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { darkMode } = useThemeStore();
  const [search, setSearch] = useState<string>('');

  const { data: users = [], isLoading, isError, error } = useQuery<User[], Error>({
    queryKey: ['users', search],
    queryFn: () => getUsers(search, accessToken || ''),
    enabled: !!accessToken, // Only run query if accessToken is available
  });

  return (
    <div className={`w-full pt-1 pb-4 pl-4 pr-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className={`border p-2 mb-4 focus:outline-primary focus:border-primary ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
        style={{ borderColor: darkMode ? '#444444' : '#dddddd' }}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading users...</span>
        </div>
      ) : isError ? (
        <p className={`text-center ${darkMode ? 'text-red-300' : 'text-red-500'}`}>{error.message}</p>
      ) : users.length === 0 ? (
        <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>No users found.</p>
      ) : (
        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {users.map(user => <UserCard key={user.id} user={user} />)}
        </div>
      )}
    </div>
  );
};

export { TailwindCss };