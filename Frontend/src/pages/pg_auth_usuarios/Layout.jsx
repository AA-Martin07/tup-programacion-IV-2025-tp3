import { Outlet, Link } from "react-router";
import { useAuth } from "./Auth.jsx";
import { Ingresar } from "./Ingresar.jsx";
import { Registrar } from "./Registrar.jsx";

export const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <main className="bg-blue-200 text-lg">
      <nav className="fixed w-full z-20 top-0 start-0 shadow-2xl font-medium">
        <ul className="w-full flex flex-wrap items-center justify-between px-6 py-4 text-blue-600">
          <div className="flex gap-8 items-center">
            <li className="list-none">
              <Link to="/">Home</Link>
            </li>
            <li className="list-none">
              <Link to="/usuarios">Usuarios</Link>
            </li>
            <li className="list-none">
              <Link to="/vehiculos">Vehiculos</Link>
            </li>
            <li className="list-none">
              <Link to="/conductores">Conductores</Link>
            </li>
            <li className="list-none">
              <Link to="/viajes">Viajes</Link>
            </li>
          </div>
          {!isAuthenticated ? (
            <div className="flex gap-3">
              <Registrar />
              <Ingresar />
            </div>
          ) : (
            <button 
              onClick={() => logout()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 transition">Salir</button>
          )}
        </ul>
      </nav>
      <div className="pt-20 min-h-screen">
        <Outlet />
      </div>

    </main>
  );
};