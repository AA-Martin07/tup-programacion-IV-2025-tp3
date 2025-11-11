import express from "express";
import { body, } from "express-validator";
import { db } from "../config/db.js";
import { verificarValidaciones, validarId } from "../middlewares/validaciones.js";
import { register, getUsuarios, getUsuarioPorId, eliminarUsuario, actualizarUsuario } from "../controllers/usuarios.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/",
  body("nombre", "Nombre inválido").notEmpty().isString().isLength({ max: 50 }).trim(),
  body("email", "email invalido")
  .isEmail()
  .trim()
  .notEmpty()
  .custom(async (value) => {
    const [rows] = await db.execute("SELECT id FROM usuarios WHERE email = ?", [value]);
      if (rows.length > 0) {
        throw new Error("Ese correo ya existe");
      }
      return true;
  }),
  body("password", "Contraseña inválida").notEmpty().isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  })
  .trim(),
  verificarValidaciones,
  register
);

router.get(
  "/",
  verificarAutenticacion,
  getUsuarios
)

router.get(
  "/:id",
  verificarAutenticacion,
  validarId,
  getUsuarioPorId
)

router.delete(
  "/:id",
  verificarAutenticacion,
  validarId,
  eliminarUsuario
);

router.put(
  "/:id",
  verificarAutenticacion,
  validarId,
  actualizarUsuario
);

export default router;