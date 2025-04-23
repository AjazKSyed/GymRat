const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const models = require("../models");
const User = models.user;
const bannedUsers = models.banned_user;
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcrypt");
var normalizeEmail = require("normalize-email");
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

/* ----------- create token at signup ---------- */
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      let firstName = req.body.firstName;
      let lastName = req.body.lastName;
      let fullName = req.body.fullName;
      let city = req.body.city;
      let state = req.body.state;
      let longitude = req.body.longitude;
      let latitude = req.body.latitude;
      let distance = req.body.distance;
      let age = req.body.age;
      let gym = req.body.gym;

      let gender = req.body.gender;
      let instagram = req.body.instagram;
      let spotify = req.body.spotify;
      let tiktok = req.body.tiktok;
      let facebook = req.body.facebook;
      let bio = req.body.bio;
      let status = "active";

      let pushTokenKey = req.body.pushTokenKey;
      try {
        const alreadybanned = await sequelize.query(
          `SELECT COUNT(1)
          FROM banned_users
          WHERE banned_users.email = '${normalizeEmail(email)}';`,
          { type: QueryTypes.SELECT }
        );
        if (alreadybanned[0].count == 0) {
          const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            fullName,
            city,
            state,
            longitude,
            latitude,
            distance,
            age,
            gender,
            instagram,
            spotify,
            tiktok,
            facebook,
            bio,
            status,
            gym,
            pushTokenKey,
          });
          return done(null, user);
        } else {
          return done({ status: 403, message: "Account has been banned" });
        }
      } catch (error) {
        console.log(error);
        if (error.name === "SequelizeUniqueConstraintError") {
          return done({ status: 403, message: "User already exists" });
        } else {
          return done({ status: 500, message: "Something went wrong" });
        }
      }
    }
  )
);

/* -----------create token at login---------- */
passport.use(
  "local",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({
          where: { email: normalizeEmail(email) },
        });
        const updatedUser = await user.update(
          {
            status: "active",
          },
          {
            where: {
              email: normalizeEmail(email),
            },
          }
        );
        if (!user) {
          console.log("no user found auth 73");
          return done(null, false, { message: "User not found" });
        }

        const validate = await user.validPassword(password);

        if (!validate) {
          console.log("wrong password");
          return done(null, false, { message: "Wrong Password" });
        }

        return done(null, user, { message: "Logged in Successfully" });
      } catch (err) {
        console.log("from index.js in auth ", err);
        return done(err);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "TOP_SECRET",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;
