import { useState, useEffect } from "react";
import { useAuth } from "./Auth.jsx";

export function Registrar(){
    const { error, register } = useAuth();
    const [open, setOpen] = useState(false);
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [activateBtn, setActivateBtn] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(nombre, email, password);
        if (result.success) setOpen(false);
    };
    useEffect(() => {
      
      const isEmailValid = email !== "";
      const isPasswordValid = password !== "" && password.length >= 8;
      const isNameValid = nombre !== "" && nombre.length <= 45
      
      setActivateBtn(!(isEmailValid && isPasswordValid && isNameValid));
    }, [nombre, email, password]);
    return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-6 py-2 bg-white border-blue-700 rounded-lg shadow-md hover:border-amber-400 border hover:text-amber-600 transition duration-300"
      >
        Registrarse
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-80 sm:w-96 p-6 rounded-2xl shadow-lg animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
              Registrese completando los campos
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  correo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="usuario@ejemplo.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="********"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center">{error}</p>
              )}

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={activateBtn}
                  className={`px-4 py-2 text-white rounded-lg transition ${
                    activateBtn 
                      ? "bg-blue-400 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}