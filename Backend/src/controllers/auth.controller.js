import { db } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;

  const [usuarios] = await db.execute(
    "SELECT * FROM usuarios WHERE email=?",
    [email]
  );

  const emailExiste = usuarios.length > 0;
  if (!emailExiste)
    return res
      .status(400)
      .json({ success: false, error: "Usuario o contraseña incorrecta" });

  const usuario = usuarios[0];
  const passwordValida = await bcrypt.compare(password, usuario.password_hash);

  if (!passwordValida)
    return res
      .status(400)
      .json({ success: false, error: "Usuario o contraseña incorrecta" });

  const token = jwt.sign( 
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "4h" }
  );

  res.json({
    success: true,
    token,
    ID: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
  });
};
