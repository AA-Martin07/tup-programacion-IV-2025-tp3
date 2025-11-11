import express from "express";
import { verificarAutenticacion } from "../middlewares/auth.middleware.js";
import { verificarValidaciones, validarId, validarConductor } from "../middlewares/validaciones.js";
import { registrarConductor, getConductores, getConductorPorId, eliminarConductor, actualizarConductor } from "../controllers/conductores.controller.js";

const router = express.Router();

router.post(
    "/registro",
    verificarAutenticacion,
    validarConductor,
    verificarValidaciones,
    registrarConductor
)

router.get(
    "/",
    verificarAutenticacion,
    getConductores
)

router.get(
    "/:id",
    verificarAutenticacion,
    validarId,
    verificarValidaciones,
    getConductorPorId
);

router.delete(
    "/:id",
    verificarAutenticacion,
    validarId,
    verificarValidaciones,
    eliminarConductor
);

router.put(
    "/:id",
    verificarAutenticacion,
    validarId,
    validarConductor,
    verificarValidaciones,
    actualizarConductor
);

export default router;