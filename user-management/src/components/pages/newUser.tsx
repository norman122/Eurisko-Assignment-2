import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserForm } from '../forms/userForm';
import { createUser } from '../../api/users';
import { useAuthStore } from '../../store/authentication';

interface UserData {
  firstName: string;
  lastName?: string;
  email: string;
  status: "active" | "locked";
  dateOfBirth: string;
}

const NewUser: React.FC = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const navigate = useNavigate();
  const mutation = useMutation<UserData, Error, UserData>({
    mutationFn: (data: UserData) => createUser(data, accessToken!),
    onSuccess: () => {
      toast.success('User created successfully');
      navigate('/dashboard');
    },
  });

  return <UserForm handleSubmit={mutation.mutate} isLoading={mutation.isPending} />;
};

export default NewUser;