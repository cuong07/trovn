import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import UserService from "../services/user.service.js";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
passport.use(
  new GoogleStrategy(
    {
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await UserService.getUserByGoogleAccountId(profile.id);

        if (!user) {
          console.log(profile);
          const username = profile.email.split("@")[0];
          user = await UserService.createUser({
            googleAccountId: profile.id,
            email: profile.emails[0].value,
            fullName: profile.displayName,
            avatarUrl: profile.photos[0].value,
            password: "",
            username,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserService.getUserById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
