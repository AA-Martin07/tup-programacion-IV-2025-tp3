import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const password_hash = await bcrypt.hash(password, 12);
    const [result] = await db.execute(
        "INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)",
        [nombre, email, password_hash]
    );
    res.status(201).json({success: true, data: {id: result.insertId, nombre, email}});

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al registrar usuario" });
  }
}

export const getUsuarios = async (req, res) => {
  try {
    const [usuarios] = await db.execute(
      `SELECT 
        u.id,
        u.nombre,
        u.email
      FROM usuarios u`
      );
    if (usuarios.length === 0) {
      return res.status(404).json({ success: false, message: "No hay usuarios registrados" });
    }
    res.status(200).json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener usuarios" });
  }
};
export const getUsuarioPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const [usuarios] = await db.execute(
      `SELECT 
        u.id,
        u.nombre,
        u.email
      FROM usuarios u
        WHERE u.id = ?`, [id]);
    if (usuarios.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ success: true, data: usuarios[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al obtener usuario" });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const {id} = req.params;
    const [result] = await db.execute("DELETE FROM usuarios WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario eliminado correctamente"});
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const {id} = req.params;
    const {nombre, password} = req.body;
    const updates = [];
    const values = [];

    if (nombre) {
      updates.push("nombre = ?");
      values.push(nombre);
    }
    if (password) {
      const password_hash = await bcrypt.hash(password, 12);
      updates.push("password_hash = ?");
      values.push(password_hash);
    }
    const query = `UPDATE usuarios SET ${updates.join(", ")} WHERE id = ?`;
    values.push(id);
    const [result] = await db.execute(query, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.status(200).json({ success: true, message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar usuario" });
  }
};