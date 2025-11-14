import { useAuth } from "./Auth"
import { Link } from "react-router";
import { Ingresar } from "./Ingresar";

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="min-h-scree p-8">
      <div className="max-w-xs w-full grid grid-cols-1 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">TPN°3</h2>
            <p className="text-gray-700 mb-3"> Esta es una página diseñada para solicitar viajes.</p>
            <h2 className="text-2xl font-bold mb-4">Solicitar un viaje</h2>
            <p className="mb-4">Gestioná tu viaje de forma rápida y sencilla.</p>
          {isAuthenticated ? (
            <Link
              to="/viajes/reservar"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Solicitar Viaje
            </Link>
          ) : (
            <Ingresar />
          )}
        </div>
      </div>
    </section>
  );
}
