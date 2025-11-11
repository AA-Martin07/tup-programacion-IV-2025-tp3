import express from "express";
import { verificarValidaciones, validarId, validarVehiculo } from "../middlewares/validaciones.js";
import { registrarVehiculo, getVehiculos, getVehiculoPorId, eliminarVehiculo, actualizarVehiculo, historialVehiculo, historialVehiculoPorId } from "../controllers/vehiculos.controller.js";
import { verificarAutenticacion } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/registro",
    verificarAutenticacion,
    validarVehiculo,
    verificarValidaciones,
    registrarVehiculo
)

router.get(
    "/",
    verificarAutenticacion,
    getVehiculos
)

router.get(
    "/historial",
    verificarAutenticacion,
    historialVehiculo
)

router.get(
    "/:id",
    verificarAutenticacion,
    validarId,
    getVehiculoPorId
)

router.get(
    "/historial/:id",
    verificarAutenticacion,
    validarId,
    historialVehiculoPorId
)

router.delete(
    "/:id",
    verificarAutenticacion,
    validarId,
    eliminarVehiculo
);

router.put(
    "/:id",
    verificarAutenticacion,
    validarId,
    validarVehiculo,
    verificarValidaciones,
    actualizarVehiculo
);

export default router;