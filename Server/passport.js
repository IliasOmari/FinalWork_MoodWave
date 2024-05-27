const passport = require("passport");
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);
const { v4: uuidv4 } = require("uuid");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        await client.connect();
        const colli = client.db("moodwave").collection("users");
        const query = { email: profile._json.email };
        const checkExistingUser = await colli.findOne(query);
        if (checkExistingUser) {
          done(null, checkExistingUser);
          return;
        }
        const user = {
          fullname: profile.displayName,
          email: profile._json.email,
          username: null,
          genres: [],
          profile_image: null,
          password: null,
          created_at: new Date(),
          likes: [],
          playlist: [],
          music: [],
          uuid: uuidv4(),
        };
        await colli.insertOne(user);
        done(null, user);
      } catch (error) {
        done(error, null);
      } finally {
        await client.close();
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
