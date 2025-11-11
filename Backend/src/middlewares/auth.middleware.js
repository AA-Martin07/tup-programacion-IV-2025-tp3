import passport from "../config/passport.js";

export const verificarAutenticacion = passport.authenticate("jwt", {
  session: false,
});