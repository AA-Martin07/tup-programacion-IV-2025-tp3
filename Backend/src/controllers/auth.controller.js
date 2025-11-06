import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const [usuarios] = await db.execute(
    "SELECT * FROM usuarios WHERE username=?",
    [username]
  );

  if (usuarios.length === 0)
    return res.status(400).json({ success: false, error: "Usuario inválido" });

  const usuario = usuarios[0];
  const passwordValida = await bcrypt.compare(password, usuario.password_hash);

  if (!passwordValida)
    return res
      .status(400)
      .json({ success: false, error: "Contraseña incorrecta" });

  const [roles] = await db.execute(
    `SELECT r.rol_name
     FROM roles r
     JOIN usuarios_roles ur ON r.id = ur.rol_id
     WHERE ur.user_id=?`,
    [usuario.id]
  );

  const rolesUsuario = roles.map((r) => r.rol_name);
  const payload = {
    userId: usuarios[0].id,
    roles: rolesUsuario
  }

  const token = jwt.sign( 
    payload,
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );

  res.json({
    success: true,
    token,
    username: usuario.username,
    roles: rolesUsuario,
  });
};
