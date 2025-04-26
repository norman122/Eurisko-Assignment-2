import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema, UserFormData } from '../../schemas/userSchema';
import { useThemeStore } from '../../store/theme';


interface UserFormProps {
  handleSubmit: (data: UserFormData) => void;
  isLoading: boolean;
  defaultValues?: UserFormData;
}

export const UserForm: React.FC<UserFormProps> = ({ handleSubmit, isLoading, defaultValues }) => {
  const formMethods = useForm<UserFormData>({
      resolver: zodResolver(userSchema),
      defaultValues:  {
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        status: 'active',
      },
    });
  
    const { register, handleSubmit: formSubmit, formState: { errors }, reset } = formMethods;
    const { darkMode } = useThemeStore();

    useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

    return (
      <form
        onSubmit={formSubmit(handleSubmit)}
        className={`space-y-6 shadow-md rounded px-8 pt-8 pb-8 mb-4 max-w-lg mx-auto ${darkMode ? 'bg-gray-400' : 'bg-white'}`}
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
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    );
  };
  