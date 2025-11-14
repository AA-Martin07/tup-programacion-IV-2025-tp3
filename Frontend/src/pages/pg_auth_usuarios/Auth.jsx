import { createContext, useContext, useState, useEffect } from "react";
import { Link } from "react-router";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    if (storedToken) {
      setToken(storedToken);
      setEmail(storedEmail);
    }
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const session = await response.json();

      if (!response.ok || session.success === false) {
        setError(session.error || "Usuario o contraseña incorrecta");
        return { success: false };
      }

      setToken(session.token);
      setEmail(session.email);
      localStorage.setItem("token", session.token);
      localStorage.setItem("email", session.email);
      setError(null);

      return { success: true };
    } catch (err) {
      setError("Error del servidor. Intente nuevamente.");
      return { success: false };
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setError(null);
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  const register = async (nombre, email, password) => {
    setError(null)
    try {
      const response = await fetch("http://localhost:3000/usuarios/registro",{
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    const session = await response.json();

    if (!response.ok || session.success === false) {
      setError(session.error || "Error al registrarse");
      return { success: false };
    }
    if (session.success) {
      setToken(session.token);
      setEmail(session.email);
      localStorage.setItem("token", session.token);
      localStorage.setItem("email", session.email);
      setError(null);
      return { success: true };
    }
    }catch (err) {
      setError("Error del servidor. Intente nuevamente.");
        return { success: false };
    }

  }
  const fetchAuth = async (url, options = {}) => {
    if (!token) throw new Error("No está iniciada la sesión");

    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        email,
        error,
        isAuthenticated: !!token,
        login,
        logout,
        register,
        
        fetchAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export const AuthPage = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <section className="min-h-screen flex items-center justify-center ">
        <div className="max-w-xs w-full bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-red-600 mb-4">Ingrese para ver esta página</h2>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Volver a Home
          </Link>
        </div>
      </section>
    );
  }

  return children;
};
