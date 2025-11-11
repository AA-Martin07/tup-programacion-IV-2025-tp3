import { db } from "../config/db.js";

export const registrarConductor = async (req, res) => {
  try {
    const { nombre, apellido, dni, licencia, vencimiento_licencia } = req.body;
    const [result] = await db.execute(
      `INSERT INTO conductores (nombre, apellido, dni, licencia, vencimiento_licencia)
       VALUES (?, ?, ?, ?, ?)`,
      [nombre, apellido, dni, licencia, vencimiento_licencia]
    );

    res.status(201).json({success: true, data: {
        id: result.insertId,
        nombre,
        apellido,
        dni,
        licencia,
        vencimiento_licencia,
      },
    });
  } catch (error) {
    console.error("❌ Error en registrarConductor:", error);
    res.status(500).json({ success: false, message: "Error al registrar conductor" });
  }
};


export const getConductores = async (req, res) => {
    try {
        const [conductores] = await db.execute(`SELECT * FROM conductores`);
        if (conductores.length === 0) {
            return res.status(404).json({ success: false, message: "No hay conductores registrados" });
        }
        res.status(200).json({ success: true, data: conductores });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener conductores" });
    }
};

export const getConductorPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const [conductores] = await db.execute(`SELECT * FROM conductores WHERE id = ?`, [id]);
        if (conductores.length === 0) {
            return res.status(404).json({ success: false, message: "Conductor no encontrado" });
        }
        res.status(200).json({ success: true, data: conductores[0] });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener conductor por ID" });
    }
};

export const eliminarConductor = async (req, res) => {
    try {
        const {id} = req.params;
        const [result] = await db.execute(`DELETE FROM conductores WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Conductor no encontrado" });
        }
        res.status(200).json({ success: true, message: "Conductor eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar conductor" });
    }
};

export const actualizarConductor = async (req, res) => {
    try {
        const {id} = req.params;
        const { nombre, apellido, dni, licencia, vencimiento_licencia } = req.body;
        const values = [];
        const updates = [];

        if (nombre) {
            updates.push("nombre = ?");
            values.push(nombre);
        }
        if (apellido) {
            updates.push("apellido = ?");
            values.push(apellido);
        }
        if (dni) {
            updates.push("dni = ?");
            values.push(dni);
        }

        if (licencia) {
            updates.push("licencia = ?");
            values.push(licencia);
        }
        if (vencimiento_licencia) {
            updates.push("vencimiento_licencia = ?");
            values.push(vencimiento_licencia);
        }
        values.push(id);
        const [result] = await db.execute(`UPDATE conductores SET ${updates.join(", ")} WHERE id = ?`, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Conductor no encontrado" });
        }
        res.status(200).json({ success: true, message: "Conductor actualizado exitosamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar conductor" });
    }
};
