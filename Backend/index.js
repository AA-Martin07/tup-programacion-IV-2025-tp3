import express from 'express'
import cors from 'cors'
import passport, { configurarPassport } from "./src/config/passport.js";
import { conectarDB } from './src/config/db.js'
import authRoutes from "./src/routes/auth.routes.js";
import usuariosRoutes from "./src/routes/usuarios.routes.js";
import vehiculosRoutes from "./src/routes/vehiculos.routes.js";
import conductoresRoutes from "./src/routes/conductores.routes.js";
import viajesRoutes from "./src/routes/viajes.routes.js";

const port = process.env.PORT || 3000

async function main() {
  // Conectar a la base de datos
  await conectarDB()

  const app = express()
  
  app.use(cors())
  app.use(express.json())

  configurarPassport();
  app.use(passport.initialize());
  
  // Rutas
  app.use('/auth', authRoutes)
  app.use('/usuarios', usuariosRoutes)
  app.use('/vehiculos', vehiculosRoutes)
  app.use('/conductores', conductoresRoutes)
  app.use('/viajes', viajesRoutes)

  app.listen(port, () => {
    console.log(`La aplicacion esta funcionando en http://localhost:${port}`)
  })
}

main().catch((err) => {
  console.error('Error al iniciar la aplicación:', err)
  process.exit(1)
})