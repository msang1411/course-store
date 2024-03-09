const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { ExtractJwt } = require("passport-jwt");
const { JWT_SECRET } = require("../configs/index");

const AccountServer = require("../models/accountServer");

// passport jwt: dùng khi login bằng token
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
      secretOrKey: JWT_SECRET,
    },
    async (payload, done) => {
      try {
        const account = await AccountServer.findById(payload.sub);
        if (account == null) return done(null, false);
        done(null, account);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

// passport local: Thường được dùng khi login bằng email, password
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const account = await AccountServer.findOne({ email });
        if (account == null) return done(null, false);

        const isCorrectPassword =
          await AccountServer.schema.methods.isValidPassword(
            password,
            account.password
          );
        if (isCorrectPassword == false) return done(null, false);
        done(null, account);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
