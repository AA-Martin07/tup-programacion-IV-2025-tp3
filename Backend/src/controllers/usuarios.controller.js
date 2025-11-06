import { db } from "../config/db.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { username, nombre, password } = req.body;
    const password_hash = await bcrypt.hash(password, 12);

    const [result] = await db.execute(
        "INSERT INTO usuarios (username, nombre, password_hash) VALUES (?, ?, ?)",
        [username, nombre, password_hash]
    );
    await db.execute(
        "INSERT INTO usuarios_roles (user_id, rol_id) VALUES (?, ?)",
        [result.insertId, 2]
    );
    res.status(201).json({success: true, data: {id: result.insertId, username, nombre, rol: "usuario"}});

    
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
        u.username,
        u.nombre, 
        r.rol_name AS rol 
        FROM usuarios u 
        JOIN usuarios_roles ur
        ON ur.user_id = u.id
        JOIN roles r
        ON r.id = ur.rol_id`
      );
    if (usuarios.length === 0) {
      return res.status(404).json({ success: false, message: "No hay usuarios registrados" });
    }
    res.json({ success: true, data: usuarios });
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
        u.username,
        u.nombre, 
        r.rol_name AS rol 
        FROM usuarios u 
        JOIN usuarios_roles ur
        ON ur.user_id = u.id
        JOIN roles r
        ON r.id = ur.rol_id
        WHERE u.id = ?`, [id]);
    if (usuarios.length === 0) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    res.json({ success: true, data: usuarios[0] });
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al eliminar usuario" });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const {id} = req.params.id;
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
    res.json({ success: true, message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al actualizar usuario" });
  }
};