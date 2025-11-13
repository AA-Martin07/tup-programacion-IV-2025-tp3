import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from "./pages/pg_auth_usuarios/Layout.jsx"
import { AuthPage, AuthProvider } from "./pages/pg_auth_usuarios/Auth.jsx"
import { Usuarios } from "./pages/pg_auth_usuarios/Usuarios.jsx"
//vehiculos
import { Vehiculos } from "./pages/Pg_vehiculos/Vehiculos.jsx"
import { AgregarVehiculo } from "./pages/Pg_vehiculos/AgregarVehiculo.jsx"
import { EditarVehiculo } from "./pages/Pg_vehiculos/EditarVehiculo.jsx"
//conductores
import { Conductores } from './pages/Pg_conductores/Conductores.jsx'
import { AgregarConductor } from './pages/Pg_conductores/AgregarConductor.jsx'
//viajes
import { Viajes } from './pages/pg_viajes/Viajes.jsx'
import { SolicitarViaje } from './pages/pg_viajes/SolicitarViaje.jsx'
import { EditarViaje } from './pages/pg_viajes/EditarViaje.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            {/* <Route index element={<Home/>}/> */}
            <Route 
              path='usuarios'
              element={
              <AuthPage>
                <Usuarios/>
              </AuthPage>
              }
            />
            <Route 
              path='vehiculos'
              element={
              <AuthPage>
                <Vehiculos/>
              </AuthPage>
              }
            />
            <Route
              path='vehiculos/registro'
              element={
                <AuthPage>
                  <AgregarVehiculo/>
                </AuthPage>
              }
            />
            <Route
              path='vehiculos/editar/:id'
              element={
                <AuthPage>
                  <EditarVehiculo/>
                </AuthPage>
              }/>

            <Route
              path='conductores'
              element={
                <AuthPage>
                  <Conductores/>
                </AuthPage>
              }
            />
            <Route
              path='conductores/registro'
              element={
                <AuthPage>
                  <AgregarConductor/>
                </AuthPage>
              }
            />
            <Route
              path='viajes'
              element={
                <AuthPage>
                  <Viajes/>
                </AuthPage>
              }
            />
            <Route
              path='viajes/reservar'
              element={
                <AuthPage>
                  <SolicitarViaje/>
                </AuthPage>
              }
            />
            <Route
              path='viajes/editar/:id'
              element={
                <AuthPage>
                  <EditarViaje/>
                </AuthPage>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
