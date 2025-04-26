import { Moon, Sun } from "lucide-react";
import { useAuthStore } from "../../store/authentication";
import { useThemeStore } from "../../store/theme"; // Make sure this path is correct

const NavBar = () => {
  const { darkMode, toggleDarkMode } = useThemeStore(); // Use the theme store

  return (
    <nav className={`text-white pt-5 pb-4 px-4 w-full ${darkMode ? 'bg-primary-dark' : 'bg-primary'}`}>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-sm md:text-lg font-bold">User Management</h1>  
        <div className="flex gap-2 items-center">
          <button 
            className={`${darkMode ? 'bg-black' : 'bg-white'} px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-base ${darkMode ? 'text-white' : 'text-primary'}  cursor-pointer`}
            onClick={() => window.location.href='/dashboard/new'}
          >
            Create User
          </button>
          <button className={`${darkMode ? 'bg-red-700' : 'bg-red-500'} text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-base cursor-pointer`} onClick={useAuthStore.getState().clearToken}>
            Logout
          </button>
          <button className="p-2 rounded flex items-center justify-center cursor-pointer" onClick={toggleDarkMode}>
            {darkMode ? <Sun size={20} className="text-white" /> : <Moon size={20} className="text-white" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
