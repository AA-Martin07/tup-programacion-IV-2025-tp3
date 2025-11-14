import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth.jsx";

export function EditarViaje() {
  const { id } = useParams();
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    vehiculo_id: "",
    conductor_id: "",
    fecha_salida: "",
    fecha_llegada: "",
    origen: "",
    destino: "",
    kilometros: "",
    observaciones: "",
  });

  const [error, setError] = useState(null);

  const cargarViaje = async () => {
    try {
      const res = await fetchAuth(`http://localhost:3000/viajes/${id}`);
      const data = await res.json();

      if (!res.ok || !data.success)
        throw new Error("Error al cargar el id del viaje");

      const viaje = data.data;

      const formatoFecha = (f) => (f ? f.slice(0, 16) : "");

      setForm({
        ...viaje,
        fecha_salida: formatoFecha(viaje.fecha_salida),
        fecha_llegada: formatoFecha(viaje.fecha_llegada),
      });

    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarViaje();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      vehiculoId: Number(form.vehiculo_id),
      conductorId: Number(form.conductor_id),
      fecha_salida: form.fecha_salida,
      fecha_llegada: form.fecha_llegada,
      origen: form.origen,
      destino: form.destino,
      kilometros: Number(form.kilometros),
      observaciones: form.observaciones,
    };
    try {
      const res = await fetchAuth(`http://localhost:3000/viajes/editar/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok || !data.success)
        throw new Error(data.message || "Error al actualizar vehículo");

      navigate("/viajes");
    } catch (err) {
      setError(err.message);
    }
  };

  const tipos = {
    vehiculo_id: "number",
    conductor_id: "number",
    kilometros: "number",
    fecha_salida: "datetime-local",
    fecha_llegada: "datetime-local",
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Editar viaje</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-4 rounded shadow-md space-y-3"
      >
        {[
          "vehiculo_id",
          "conductor_id",
          "fecha_salida",
          "fecha_llegada",
          "origen",
          "destino",
          "kilometros",
          "observaciones",
        ].map((campo) => (
          <div key={campo}>
            <label className="block font-medium capitalize">{campo}</label>
            <input
              type={tipos[campo] || "text"}
              name={campo}
              value={form[campo] || ""}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        ))}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Guardar cambios
        </button>
      </form>
    </section>
  );
}
