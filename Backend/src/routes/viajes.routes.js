import express from "express";
import { verificarAutenticacion } from "../middlewares/auth.middleware.js";
import { verificarValidaciones, validarId, validarViaje } from "../middlewares/validaciones.js";
import { registrarViaje, getViajes, getViajePorId, eliminarViaje, actualizarViaje} from "../controllers/viajes.controller.js";

const router = express.Router();

router.post(
    "/reservar",
    validarViaje,
    verificarValidaciones,
    verificarAutenticacion,
    registrarViaje
)

router.get(
    "/",
    verificarAutenticacion,
    getViajes
)

router.get(
    "/:id",
    verificarAutenticacion,
    validarId,
    verificarValidaciones,
    getViajePorId
);

router.delete(
    "/:id",
    verificarAutenticacion,
    validarId,
    verificarValidaciones,
    eliminarViaje
);

router.put(
    "/editar/:id",
    verificarAutenticacion,
    validarId,
    verificarValidaciones,
    actualizarViaje
);

export default router;