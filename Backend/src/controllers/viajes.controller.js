import { db } from "../config/db.js";

export const registrarViaje = async (req, res) => {
    try {
        const { vehiculoId, conductorId, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones } = req.body;
        const [result] = await db.execute(`INSERT INTO viajes (vehiculo_Id, conductor_Id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [vehiculoId, conductorId, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones]
        );
        res.status(201).json({ success: true, data: { id: result.insertId, vehiculoId, conductorId, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones }});
    }
    catch (error){
        res.status(500).json({ success: false, message: "Error al registrar viaje" });
    }
};

export const getViajes = async (req, res) => {
    try {
        const [viajes] = await db.execute(`SELECT * FROM viajes`);
        if (viajes.length === 0) {
            return res.status(404).json({ success: false, message: "Aún no hay viajes registrados" });
        }
        const viajesLocal = viajes.map(v => ({
            ...v,
            fecha_salida: new Date(v.fecha_salida).toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
            }),
            fecha_llegada: new Date(v.fecha_llegada).toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
            }),
        }));
        res.status(200).json({ success: true, data: viajesLocal });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener viajes" });
    }
};

export const getViajePorId = async (req, res) => {
    try {
        const {id} = req.params
        const [viajes] = await db.execute(`SELECT * FROM viajes WHERE id = ?`,[id])
        if (viajes.length === 0) {
            return res.status(404).json({ success: false, message: "No hay viajes registrados con ese ID" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener id de viaje"})
    }
}

export const eliminarViaje = async (req, res) => {
    try {
        const {id} = req.params;
        const [result] = await db.execute(`DELETE FROM viajes WHERE id = ?`, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Viaje no encontrado" });
        }
        res.status(200).json({ success: true, message: "Viaje eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar viaje" });
    }
};

export const actualizarViaje = async (req, res) => {
    try {
        const {id} = req.params;
        const { vehiculoId, conductorId, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones } = req.body;
        const updates = [];
        const values = [];
        if (vehiculoId) {
            updates.push("vehiculo_Id = ?");
            values.push(vehiculoId);
        }
        if (conductorId) {
            updates.push("conductor_Id = ?");
            values.push(conductorId);
        }
        if (fecha_salida) {
            updates.push("fecha_salida = ?");
            values.push(fecha_salida);
        }
        if (fecha_llegada) {
            updates.push("fecha_llegada = ?");
            values.push(fecha_llegada);
        }
        if (origen) {
            updates.push("origen = ?");
            values.push(origen);
        }
        if (destino) {
            updates.push("destino = ?");
            values.push(destino);
        }
        if (kilometros) {
            updates.push("kilometros = ?");
            values.push(kilometros);
        }
        if (observaciones) {
            updates.push("observaciones = ?");
            values.push(observaciones);
        }
        values.push(id);

        const [result] = await db.execute(
            `UPDATE viajes SET ${updates.join(", ")} WHERE id = ?`,
            values
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Viaje no encontrado" });
        }
        res.status(200).json({ success: true, message: "Viaje actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al actualizar viaje" });
    }
};