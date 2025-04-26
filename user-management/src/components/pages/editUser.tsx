import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { getUserById, updateUser, User } from '../../api/users';
import { useAuthStore } from '../../store/authentication';
import { useThemeStore } from '../../store/theme';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '../../schemas/userSchema';

interface FormData extends UserFormData {
  id: number;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { darkMode } = useThemeStore();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.accessToken);

  // Updated fetching logic
  const { data: user, isLoading, isError, error } = useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await getUserById(Number(id), token!);
      return response.result.data.user as User;
    },
    enabled: !!id,
  });

  const mutation = useMutation<User, Error, FormData>({
    mutationFn: (formData: FormData) => updateUser(Number(id), formData, token!),
    onSuccess: () => {
      toast.success('User updated successfully');
      navigate('/dashboard');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const formMethods = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = formMethods;

  React.useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName || '',
        email: user.email,
        dateOfBirth: user.dateOfBirth,
        status: user.status === 'active' ? 'active' : 'locked',
      });
    }
  }, [user, reset]);

  const onSubmit = (data: UserFormData) => {
    if (!id) return;
    mutation.mutate({ ...data, id: Number(id) });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
        <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Loading...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`text-center ${darkMode ? 'text-red-300' : 'text-red-600'}`}>
        Error: {error.message}
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        User data not found.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`space-y-6 shadow-md rounded px-8 pt-8 pb-8 mb-4 max-w-lg mx-auto ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'}`}
    >
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
            First Name
          </label>
          <input
            {...register('firstName')}
            id="firstName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'text-white bg-gray-600' : 'text-gray-700 bg-white'}`}
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
            Last Name (Optional)
          </label>
          <input
            {...register('lastName')}
            id="lastName"
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'text-white bg-gray-600' : 'text-gray-700 bg-white'}`}
          />
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            {...register('email')}
            id="email"
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'text-white bg-gray-600' : 'text-gray-700 bg-white'}`}
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
        </div>
  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            {...register('dateOfBirth')}
            id="dateOfBirth"
            type="date"
            className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'text-white bg-gray-600' : 'text-gray-700 bg-white'}`}
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth.message}</p>}
        </div>
  
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            {...register('status')}
            id="status"
            className={`block w-full border hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${darkMode ? 'text-white bg-gray-600' : 'text-gray-700 bg-white'}`}
          >
            <option value="active">Active</option>
            <option value="locked">Locked</option>
          </select>
          {errors.status && <p className="text-red-500 text-xs italic">{errors.status.message}</p>}
        </div>
  
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${darkMode ? 'bg-gray-300 hover:bg-primary-dark' : 'bg-gray-300 hover:bg-primary'}`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
    </form>
  );
};

export default EditUser;
