import { useEffect, useState } from "react";
import { useAuth } from "./Auth.jsx";

export function Usuarios() {
  const { fetchAuth } = useAuth();
  const [usuarios, setUsuarios] = useState([]);
  const [error, setError] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const res = await fetchAuth("http://localhost:3000/usuarios");
      if (!res.ok) throw new Error("Error al obtener los usuarios");

      const data = await res.json();
      setUsuarios(data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios</h2>

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-xs">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Nombre</th>
            <th className="py-2 px-4 text-left">Correo</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{u.id}</td>
                <td className="py-2 px-4">{u.nombre}</td>
                <td className="py-2 px-4">{u.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center py-3 text-gray-500 italic"
              >
                No hay usuarios registrados
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}