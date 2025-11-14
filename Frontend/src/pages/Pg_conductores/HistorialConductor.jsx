import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth";

export function HistorialConductor() {
  const { id } = useParams();
  const { fetchAuth } = useAuth();
  const [historial, setHistorial] = useState(null);
  const [error, setError] = useState(null);

  const cargarHistorial = async () => {
    try {
      console.log("Cargando historial del conductor ID:", id);
      
      const res = await fetchAuth(`http://localhost:3000/conductores/historial/${id}`);
      console.log("Respuesta historial - Status:", res.status);
      
      if (!res.ok) throw new Error("Error al obtener historial del conductor");

      const data = await res.json();
      console.log("Datos del historial:", data);
      
      if (!data.success) {
        throw new Error(data.message || "Error al cargar historial");
      }

      setHistorial(data.data);
    } catch (err) {
      console.error("Error en cargarHistorial:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarHistorial();
  }, [id]);

  if (error) {
    return (
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Historial del Conductor</h2>
        <div className="text-red-600 bg-red-50 p-4 rounded-md">
          {error}
        </div>
        <div className="mt-4">
          <Link 
            to="/conductores" 
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Volver a Conductores
          </Link>
        </div>
      </section>
    );
  }

  if (!historial) {
    return (
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4">Historial del Conductor</h2>
        <div className="text-gray-500 text-center">No se encontró historial</div>
      </section>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Historial del Conductor</h2>
      
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Nombre:</label>
            <p className="text-lg">{historial.nombre} {historial.apellido}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">DNI:</label>
            <p className="text-lg">{historial.dni}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Licencia:</label>
            <p className="text-lg">{historial.licencia}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Vencimiento Licencia:</label>
            <p className="text-lg">{historial.vencimiento_licencia ? new Date(historial.vencimiento_licencia).toLocaleDateString() : 'No especificado'}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">ID Conductor:</label>
            <p className="text-lg">{historial.conductor_id}</p>
          </div>
          
          <div className="border-b pb-2">
            <label className="font-semibold text-gray-600">Cantidad de Viajes:</label>
            <p className="text-lg font-bold text-blue-600">{historial.cantidad_viajes}</p>
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