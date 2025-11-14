import { param, body, validationResult } from "express-validator";
import { db } from "../config/db.js";

export const validarId = param("id").isInt({ min: 1 });

// Middleware verifaciones
export const verificarValidaciones = (req, res, next) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Falla de validacion",
      errores: validacion.array(),
    });
  }
  next();
};
//validacion para crear o actualizar vehiculo
export const validarVehiculo = [
  body("marca", "Marca inválida").notEmpty().isString().isLength({ max: 45 }).trim(),
  body("modelo", "Modelo inválido").notEmpty().isString().isLength({ max: 45 }).trim(),
  body("patente", "Patente inválida").notEmpty().isString().isLength({ min: 6, max: 7 }).trim().custom(
    async (value, { req }) =>{
      const {id} = req.params;
      const [rows] = await db.execute("SELECT id FROM vehiculos WHERE patente = ?", [value]);
      if (rows.length > 0 && rows[0].id != id) {
        throw new Error("La patente ya existe");
      }
    }),
  body("año", "Año inválido").isInt({ min: 1960, max: 2025 }),
  body("capacidad", "Capacidad inválida").isInt({ min: 1, max: 7 }),
];

export const validarConductor = [
  body("nombre", "Nombre inválido").notEmpty().isString().isLength({ max: 45 }).trim(),
  body("apellido", "Apellido inválido").notEmpty().isString().isLength({ max: 45 }).trim(),
  body("dni", "DNI inválido").notEmpty().isLength({ min: 7, max: 8 }).trim().custom(
    async (value, { req }) =>{
      const {id} = req.params;
      const [rows] = await db.execute("SELECT id FROM conductores WHERE dni = ?", [value]);
      if (rows.length > 0 && rows[0].id != id) {
        throw new Error("El Nro de DNI ya existe");
      }
    }),
  body("licencia", "Licencia inválida").notEmpty().isString().isLength({ max: 20 }).trim().custom(
    async (value, { req }) =>{
      const {id} = req.params;
      const [rows] = await db.execute("SELECT id FROM conductores WHERE licencia = ?", [value]);
      if (rows.length > 0 && rows[0].id != id) {
        throw new Error("La licencia ya existe");
      }
    }),
  body("vencimiento_licencia", "Vencimiento de licencia inválido").isDate().withMessage("Debe ser una fecha válida en formato AAAA-MM-DD"),
];

export const validarViaje = [
  body("vehiculoId", "vehiculoId invalido").notEmpty().isInt({min: 1}).custom(async (value)=> {
    const [rows] = await db.execute("SELECT id FROM vehiculos WHERE id = ?", [value]);
    if (rows.length === 0) {
      throw new Error("El id del vehiculo no existe");
    }
  }),
  body("conductorId", "conductorId invalido").notEmpty().isInt({min: 1}).custom(async (value)=> {
    const [rows] = await db.execute("SELECT id FROM conductores WHERE id = ?", [value]);
    if (rows.length === 0) {
      throw new Error("El id del conductor no existe");
    }
  }),
  body("fecha_salida", "Fecha de salida inválida").notEmpty(),
  body("fecha_llegada", "Fecha de llegada inválida").notEmpty(),
  body("origen", "Origen inválido").notEmpty().isString().isLength({ max: 100 }).trim(),
  body("destino", "Destino inválido").notEmpty().isString().isLength({ max: 100 }).trim(),
  body("kilometros", "Kilómetros inválidos").notEmpty().isInt({ min: 1 }),
  body("observaciones", "Observaciones inválidas").optional().isString().isLength({ max: 100 }).trim(),
];