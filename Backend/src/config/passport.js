import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";

export function configurarPassport() {
  const opcionesJWT = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(opcionesJWT, async (payload, done) => {
      try {
        return done(null, payload);
      } catch (error) {
        return done(error, false);
      }
    })
  );
}

export default passport;