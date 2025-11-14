import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth";

export function HistorialVehiculo() {
  const { id } = useParams();
  const { fetchAuth } = useAuth();
  const [historial, setHistorial] = useState(null);
  const [error, setError] = useState(null);

  const cargarHistorial = async () => {
    try {
      console.log("Cargando historial del vehículo ID:", id);

      const res = await fetchAuth(`http://localhost:3000/vehiculos/historial/${id}`);
      if (!res.ok) throw new Error("Error al obtener historial del vehículo");

      const data = await res.json();
      if (!data.success) {
        throw new Error(data.message || "Error al cargar historial del vehículo");
      }

      setHistorial(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, [id]);

  if (!historial) return <p className="p-6 text-red-500">Este vehiculo no realizo ningun viaje</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Historial del Vehículo</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Marca:</label>
            <p className="text-lg">{historial.marca}</p>
          </div>

          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Modelo:</label>
            <p className="text-lg">{historial.modelo}</p>
          </div>

          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Patente:</label>
            <p className="text-lg">{historial.patente}</p>
          </div>

          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Año:</label>
            <p className="text-lg">{historial.año}</p>
          </div>

          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Capacidad:</label>
            <p className="text-lg">{historial.capacidad} personas</p>
          </div>

          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Kilómetros Totales:</label>
            <p className="text-lg font-bold text-blue-600">
              {historial.kilometros_totales || 0} km
            </p>
          </div>

        </div>

        <div className="flex space-x-4 mt-6">
          <Link
            to="/viajes"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Ver Todos los Viajes
          </Link>
        </div>
      </div>
    </section>
  );
}
