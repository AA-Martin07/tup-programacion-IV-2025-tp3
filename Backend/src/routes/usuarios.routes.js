import express from "express";
import { body, } from "express-validator";
import { db } from "../config/db.js";
import { verificarValidaciones, validarId } from "../middlewares/validaciones.js";
import { register, getUsuarios, getUsuarioPorId, eliminarUsuario, actualizarUsuario } from "../controllers/usuarios.controller.js";
import { verificarAutenticacion, verificarAutorizacion } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  body("username", "Nombre de usuario invalido")
  .isAlphanumeric("es-ES")
  .isLength({ max: 20 })
  .trim()
  .notEmpty()
  .custom(async (value) => {
    const [rows] = await db.execute("SELECT id FROM usuarios WHERE username = ?", [value]);
      if (rows.length > 0) {
        throw new Error("El nombre de usuario ya existe");
      }
      return true;
  }),
  body("nombre", "Nombre inválido").isString().isLength({ max: 50 }),
  body("password", "Contraseña inválida").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  }),
  verificarValidaciones,
  register
);

router.get(
  "/",
  verificarAutenticacion,
  verificarAutorizacion("admin"),
  getUsuarios
)

router.get(
  "/:id",
  verificarAutenticacion,
  verificarAutorizacion("admin"),
  validarId,
  getUsuarioPorId
)

router.delete(
  "/:id",
  verificarAutenticacion,
  verificarAutorizacion("admin"),
  validarId,
  eliminarUsuario
);

router.put(
  "/:id",
  verificarAutenticacion,
  validarId,
  actualizarUsuario)

export default router;