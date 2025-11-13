import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth";

export function Viajes() {
  const { fetchAuth } = useAuth();
  const [viajes, setViajes] = useState([]);
  const [error, setError] = useState(null);

  const cargarViajes = async () => {
    try {
      const res = await fetchAuth("http://localhost:3000/viajes");
      if (!res.ok) throw new Error("Error al obtener historial de viajes");

      const data = await res.json();
      setViajes(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

    useEffect(() => {
    cargarViajes();
    }, []);

  return(
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Viajes</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-xs">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">IDVehiculo</th>
            <th className="py-2 px-4 text-left">IDConductor</th>
            <th className="py-2 px-4 text-left">Salida</th>
            <th className="py-2 px-4 text-left">Llegada</th>
            <th className="py-2 px-4 text-left">Origen</th>
            <th className="py-2 px-4 text-left">Destino</th>
            <th className="py-2 px-4 text-left">Kilometros</th>
            <th className="py-2 px-4 text-left">Observaciones</th>
            <th className="py-2 px-4 text-left">Acciones</th>

          </tr>
        </thead>
        <tbody>
          {viajes.length > 0 ? (
            viajes.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{v.id}</td>
                <td className="py-2 px-4">{v.vehiculo_id}</td>
                <td className="py-2 px-4">{v.conductor_id}</td>
                <td className="py-2 px-4">{v.fecha_salida}</td>
                <td className="py-2 px-4">{v.fecha_llegada}</td>
                <td className="py-2 px-4">{v.origen}</td>
                <td className="py-2 px-4">{v.destino}</td>
                <td className="py-2 px-4">{v.kilometros}</td>
                <td className="py-2 px-4">{v.observaciones}</td>
                <td className="flex-1 space-x-1.5">
                    <button 
                        className="bg-red-600 text-white px-3  rounded hover:bg-red-700 transition"
                        onClick={() => eliminarViaje(v.id)}>X
                    </button>
                    <button>
                      <Link
                        to={`/viajes/editar/${v.id}`}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                        >editar
                      </Link>
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-3 text-gray-500 italic"
              >
                No hay viajes registrados
              </td>
            </tr>
          )}  
        </tbody>
      </table>
      <div className="pt-6">
        <button>
            <Link
                to={`/viajes/reservar`}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition">
                    Solicitar viaje
            </Link>
        </button>
      </div>
    </section>
  );
}

