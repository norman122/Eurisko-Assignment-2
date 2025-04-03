import { Moon } from "lucide-react"; // Import the moon icon from Lucide

const NavBar = () => {
  return (
    <nav className="text-white pt-5 pb-4 px-4 w-full" style={{ backgroundColor: '#3251D0' }}>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-sm md:text-lg font-bold">User Management</h1>  
        <div className="flex gap-2 items-center">
          <button className="bg-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-base" style={{ color: '#3251D0' }}>
            Create User
          </button>
          <button className="bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded text-xs md:text-base">
            Logout
          </button>
          <button className="p-2 rounded flex items-center justify-center">
            <Moon size={20} className="text-primary" /> 
          </button>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
