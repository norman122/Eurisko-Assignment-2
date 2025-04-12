import { Navigate, Outlet } from "react-router";
import { NavBar } from "../molecules/NavBar";
import { useThemeStore } from "../../store/theme";

export function Layout() {
  const { darkMode } = useThemeStore();

  return (
    <>
      <NavBar />
      <section className={`flex-1 p-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
        <Outlet />
      </section>
    </>
  );
}
