import React from 'react';
import { useThemeStore } from '../../store/theme';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel }) => {
  const { darkMode } = useThemeStore();
  
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 ${darkMode ? 'bg-black bg-opacity-50' : 'bg-white bg-opacity-50'}`}>
      <div className={`rounded-lg shadow-lg p-6 w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>{title}</h2>
        <p className={`mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className={`px-4 py-2 rounded cursor-pointer ${darkMode ? 'bg-primary-dark text-white' : 'bg-primary text-white'}`}>Cancel</button>
          <button onClick={onConfirm} className={`px-4 py-2 rounded cursor-pointer ${darkMode ? 'bg-red-800 text-white' : 'bg-red-500 text-white'}`}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;