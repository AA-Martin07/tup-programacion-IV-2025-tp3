import passport from "../config/passport.js";

export const verificarAutenticacion = passport.authenticate("jwt", {
  session: false,
});

export const verificarAutorizacion = (rolRequerido) => {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    if (!roles.includes(rolRequerido)) {
      return res.status(403).json({
        success: false,
        message: "Acceso denegado: no tienes permiso suficiente",
      });
    }
    next();
  };
};