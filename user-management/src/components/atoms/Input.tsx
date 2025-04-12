import React from 'react';
import { useThemeStore } from '../../store/theme';

interface InputProps {
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, id, value, onChange, className, required }) => {
    const { darkMode } = useThemeStore();

    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full px-3 py-2 border ${darkMode ? 'border-gray-600' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:border-primary ${className}`}
            required={required}
        />
    );
};

export default Input;