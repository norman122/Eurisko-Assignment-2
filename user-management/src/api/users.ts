import { UserFormData } from '../schemas/userSchema';

export type User = {
    dateOfBirth: string | undefined;
    result: any;
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    dob: string;
  };
  
  export const getUsers = async (search: string, accessToken: string): Promise<User[]> => {
    const query = search ? `?search=${encodeURIComponent(search)}` : '';
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
  
    return rawUsers.map((u: any) => ({
      id: parseInt(u.id),
      firstName: u.firstName ?? "",
      lastName: u.lastName ?? "",
      email: u.email,
      status: u.status,
      dob: u.dateOfBirth,
    }));
  };

  const headers = (token: string) => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });
  
  export const createUser = async (data: UserFormData, token: string) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: headers(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to create user');
    return res.json();
  };
  
  export const updateUser = async (id: number, data: UserFormData, token: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: headers(token),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to update user');
    return res.json();
  };
  
  export const deleteUser = async (id: number, token: string) => {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
      headers: headers(token),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to delete user');
    return res.json();
  };
  
  export const getUserById = async (id: number, token: string): Promise<User> => {
    const response = await fetch(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch user with id ${id}`);
    }
  
    const data = await response.json();
  
    if (!data) {
      throw new Error(`User with id ${id} not found`);
    }
  
    return data;
  };