import React, { useEffect, useState } from 'react';
import { UserCard } from "../atoms/UserCard"; 
import { useAuthStore } from '../../store/authentication';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  dob: string;
};

const TailwindCss: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchUsers = async (keyword: string = ''): Promise<void> => {
    try {
      setLoading(true);
      setError("");
      
      const query = keyword ? `?search=${encodeURIComponent(keyword)}` : '';
      const response = await fetch(`/api/users${query}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const json = await response.json();
      const rawUsers = json.result.data.users;

      const cleanedUsers: User[] = rawUsers.map((u: any) => ({
        id: parseInt(u.id),
        firstName: u.firstName ?? "",
        lastName: u.lastName ?? "",
        email: u.email,
        status: u.status,
        dob: u.dateOfBirth,
      }));

      setUsers(cleanedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("An error occurred while fetching users.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(search);
  }, [accessToken, search]);

  return (
    <div className="w-full pt-1 pb-4 pl-4 pr-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search users..."
        className="border p-2 mb-4 focus:outline-primary focus:border-primary"
        style={{ borderColor: '#dddddd' }}
      />

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
          <span className="ml-2 text-gray-600">Loading users...</span>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        // ✅ User data only shown when loading is complete
        <div className="grid gap-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {users.map(user => <UserCard key={user.id} user={user} />)}
        </div>
      )}

    </div>
  );
};

export { TailwindCss };
