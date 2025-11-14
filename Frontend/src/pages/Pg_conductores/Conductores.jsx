import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth.jsx";

export function Conductores() {
  const { fetchAuth } = useAuth();
  const [conductores, setConductores] = useState([]);
  const [error, setError] = useState(null);

  const cargarConductores = async () => {
    try {
      const res = await fetchAuth("http://localhost:3000/conductores");
      if (!res.ok) throw new Error("Error al obtener los conductores");

      const data = await res.json();
      setConductores(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const eliminarConductor = async (id) => {
    if (window.confirm("Desea eliminar a este conductor")) {
        const res = await fetchAuth(`http://localhost:3000/conductores/${id}`,{
            method: "DELETE"
        })
        const data = await res.json()
        if (!res.ok || !data.success) {
            return window.alert("Error al eliminar el vehiculo");
        }
        cargarConductores()
    }
  }

  useEffect(() => {
    cargarConductores();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Conductores</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-xs">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Apellido</th>
            <th className="py-2 px-4 text-left">DNI</th>
            <th className="py-2 px-4 text-left">Licencia</th>
            <th className="py-2 px-4 text-left">Exp. de licencia</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {conductores.length > 0 ? (
            conductores.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{c.id}</td>
                <td className="py-2 px-4">{c.nombre}</td>
                <td className="py-2 px-4">{c.apellido}</td>
                <td className="py-2 px-4">{c.dni}</td>
                <td className="py-2 px-4">{c.licencia}</td>
                <td className="py-2 px-4">{c.vencimiento_licencia}</td>
                <td className="flex-1 space-x-1.5">
                    <button 
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => eliminarConductor(c.id)}>X
                    </button>
                    <Link
                        to={`/conductores/${c.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >editar
                    </Link>
                    <Link
                        to={`/conductores/historial/${c.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >historial
                    </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-3 text-gray-500 italic"
              >
                No hay conductores registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pt-6">
        <button>
            <Link
                to={`/conductores/registro`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                    Registrar conductor
            </Link>
        </button>
      </div>
    </section>
  );
}