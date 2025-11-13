import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth";

export function Vehiculos() {
  const { fetchAuth } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState(null);

  const cargarVehiculos = async () => {
    try {
      const res = await fetchAuth("http://localhost:3000/vehiculos");
      if (!res.ok) throw new Error("Error al obtener los vehiculos");

      const data = await res.json();
      setVehiculos(data.data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const eliminarVehiculo = async (id) => {
    if (window.confirm("Desea eliminar el vehiculo")) {
        const res = await fetchAuth(`http://localhost:3000/vehiculos/${id}`,{
            method: "DELETE"
        })
        const data = await res.json()
        if (!res.ok || !data.success) {
            return window.alert("Error al eliminar el vehiculo");
        }
        cargarVehiculos()
    }
  }

  useEffect(() => {
    cargarVehiculos();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Vehiculos</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-xs">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Marca</th>
            <th className="py-2 px-4 text-left">Modelo</th>
            <th className="py-2 px-4 text-left">Patente</th>
            <th className="py-2 px-4 text-left">Año</th>
            <th className="py-2 px-4 text-left">Capacidad</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehiculos.length > 0 ? (
            vehiculos.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{v.id}</td>
                <td className="py-2 px-4">{v.marca}</td>
                <td className="py-2 px-4">{v.modelo}</td>
                <td className="py-2 px-4">{v.patente}</td>
                <td className="py-2 px-4">{v.año}</td>
                <td className="py-2 px-4">{v.capacidad}</td>
                <td className="flex-1">
                    <button 
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                        onClick={() => eliminarVehiculo(v.id)}>X
                    </button>
                    <Link
                        to={`/vehiculos/editar/${v.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >edit
                    </Link>
                    <Link
                        to={`/vehiculos/historial/${v.id}`}
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
                No hay vehiculos registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pt-6">
        <button>
            <Link
                to={`/vehiculos/registro`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                    Registrar vehiculo
            </Link>
        </button>
      </div>
    </section>
  );
}