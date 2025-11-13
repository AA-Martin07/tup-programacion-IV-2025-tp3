import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../pg_auth_usuarios/Auth.jsx";

export function AgregarVehiculo() {
  const { fetchAuth } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    patente: "",
    año: "",
    capacidad: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetchAuth("http://localhost:3000/vehiculos/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Error al agregar vehículo");
      navigate("/vehiculos");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Agregar Vehículo</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-4 rounded shadow-md space-y-3"
      >
        {["marca", "modelo", "patente", "año", "capacidad"].map((campo) => (
          <div key={campo}>
            <label className="block font-medium capitalize">{campo}</label>
            <input
              type="text"
              name={campo}
              value={form[campo]}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>
        ))}
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar
        </button>
      </form>
    </section>
  );
}