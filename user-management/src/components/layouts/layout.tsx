import { Navigate, Outlet } from "react-router";
import { NavBar } from "../molecules/NavBar";

export function Layout() {
  return (
    <>
      <NavBar />
      <section className="flex-1 p-4">
        <Outlet />
      </section>
    </>
  );
}
