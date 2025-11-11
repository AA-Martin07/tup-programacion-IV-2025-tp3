import { db } from "../config/db.js";

export const registrarVehiculo = async (req, res) => {
    try {
        const {marca, modelo, patente, año, capacidad} = req.body;
        const [result] = await db.execute(
            "INSERT INTO vehiculos (marca, modelo, patente, año, capacidad) VALUES (?, ?, ?, ?, ?)",
            [marca, modelo, patente, año, capacidad]
        );
        res.status(201).json({success: true, data: {id: result.insertId, marca, modelo, patente, año, capacidad}});
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error al registrar vehículo" });
    }
}

export const getVehiculos = async (req, res) => {
    try {
        const [vehiculos] = await db.execute(`SELECT * FROM vehiculos`);
        if (vehiculos.length === 0) {
            return res.status(404).json({ success: false, message: "No hay vehículos registrados" });
        }
        res.status(201).json({ success: true, data: vehiculos });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener vehículos" });
    }
};

export const getVehiculoPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const [vehiculos] = await db.execute(`SELECT * FROM vehiculos WHERE id = ?`, [id]);
        if (vehiculos.length === 0) {
            return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
        }
        res.status(201).json({ success: true, data: vehiculos[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener vehículo" });
    }
}

export const eliminarVehiculo = async (req, res) => {
    try {
        const {id} = req.params;
        const [result] = await db.execute(`DELETE FROM vehiculos WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
        }
        res.status(201).json({ success: true, message: "Vehículo eliminado correctamente"});
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar vehículo" });
    }
}

export const actualizarVehiculo = async (req, res) => {
    try {
        const {id} = req.params;
        const {marca, modelo, patente, año, capacidad} = req.body;
        const updates = [];
        const values = [];

        if (marca) {
            updates.push("marca = ?");
            values.push(marca);
        }
        if (modelo) {
            updates.push("modelo = ?");
            values.push(modelo);
        }
        if (patente) {
            updates.push("patente = ?");
            values.push(patente);
        }
        if (año) {
            updates.push("año = ?");
            values.push(año);
        }
        if (capacidad) {
            updates.push("capacidad = ?");
            values.push(capacidad);
        }

        const query = `UPDATE vehiculos SET ${updates.join(", ")} WHERE id = ?`;
        values.push(id);
        
        const [result] = await db.execute(query, values);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Vehículo no encontrado" });
        }
        res.status(201).json({ success: true, message: "Vehículo actualizado correctamente"});
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar vehículo" });
    }
}

export const historialVehiculo = async (req, res) => {
    try {
        const [historial] = await db.execute(
            `SELECT
                v.id AS vehiculo_id,
                v.marca,
                v.modelo,
                v.patente,
                v.año,
                v.capacidad,
                SUM(vi.kilometros) AS kilometros_totales,
                COUNT(vi.id) AS cantidad_viajes
                FROM vehiculos v
                JOIN viajes vi ON vi.vehiculo_id = v.id
                GROUP BY v.id`
            );
        if (historial.length === 0) {
            return res.status(404).json({ success: false, message: "No se encontró historial de viajes" });
        }
        res.status(201).json({ success: true, data: historial });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener historial del vehículo" });
    }
};

export const historialVehiculoPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const [historial] = await db.execute(
            `SELECT
                v.id AS vehiculo_id,
                v.marca,
                v.modelo,
                v.patente,
                v.año,
                v.capacidad,
                SUM(vi.kilometros) AS kilometros_totales,
                COUNT(vi.id) AS cantidad_viajes
                FROM vehiculos v
                JOIN viajes vi ON vi.vehiculo_id = v.id
                WHERE v.id = ?
                GROUP BY v.id`
        ,[id]);
        if (historial.length === 0) {
            return res.status(404).json({ success: false, message: "No se encontró historial para el vehículo" });
        }
        res.status(201).json({ success: true, data: historial });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener historial del vehículo" });
    }
};