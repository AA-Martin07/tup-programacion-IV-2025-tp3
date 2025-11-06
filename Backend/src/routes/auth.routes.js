import express from "express";
import { body } from "express-validator";
import { verificarValidaciones } from "../middlewares/validaciones.js";
import { login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post(
  "/login",
  body("username").isAlphanumeric("es-ES").isLength({ max: 20 }),
  body("password").isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 0,
    minNumbers: 1,
    minSymbols: 0,
  }),
  verificarValidaciones,
  login
);

export default router;