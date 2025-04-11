import React from 'react';

interface InputProps {
    type: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    required?: boolean;
}

const Input: React.FC<InputProps> = ({ type, id, value, onChange, className, required }) => {
    return (
        <input
            type={type}
            id={id}
            value={value}
            onChange={onChange}
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-primary ${className}`}
            required={required}
        />
    );
};

export default Input;