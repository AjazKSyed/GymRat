var express = require("express");
var router = express.Router();
var userController = require("../controllers/users.js");
const passport = require("../auth");
const jwt = require("jsonwebtoken");

// verifies that token is for the each user
function verify(userId, token) {
  var verified = false;
  jwt.verify(token, "TOP_SECRET", (err, payload) => {
    if (err === null) {
      console.log("Your JWT was successfully validated!");
    } else if (err.name === "TokenExpiredError") {
      console.log("Whoops, your token has expired!");
    } else if (err.name === "JsonWebTokenError") {
      console.log("That JWT is malformed!");
    }
    // Both should be the same
    verified = payload.user.id == userId;
  });
  return verified;
}

// ADMIN CALLS

// get count admin call
router.get(
  "/totalUsers/:adminId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.gymrat.app",
      "Access-Control-Allow-Credentials": true,
    });
    if (verify(req.params.adminId, req.query.secret_token)) {
      return userController.getCount().then((user) => {
        res.send({ data: [user] });
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// delete single user
router.delete(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return userController.deleteUser(req.params.userId).then((user) => {
      res.send({ data: [user] });
    });
  }
);
//////////////

// delete single user
router.delete(
  "/deleteAccount/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userController.deleteUser(req.params.userId).then((user) => {
        res.send({ data: [user] });
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// all users listed
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return userController.getAllUsers().then((users) => {
      res.json(users);
    });
  }
);

// get single user
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return userController.getUserByUserId(req.params.userId).then((user) => {
      res.json(user);
    });
  }
);

//  finding all the users with this city
router.get(
  "/getByLocation/:userId/:offset/:latitude/:longitude/:distance",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userController
        .getAllUserByLocation(
          req.params.userId,
          req.params.latitude,
          req.params.longitude,
          req.params.distance,
          req.params.offset
        )
        .then((data) => {
          res.json(data);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// searhbar call
router.post(
  "/getUsersByName",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.userId, req.query.secret_token)) {
      return userController
        .getUsersByName(req)
        .then((users) => res.json(users));
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

//  -------- create token on user signup --------
// full registration here
router.post(
  "/registration",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    // console.log(req);
    const body = { id: req.user.id, email: req.user.email };
    const token = jwt.sign({ user: body }, "TOP_SECRET");
    res.json({
      message: "Signup successful",
      user: req.user,
      token: token,
    });
  }
);

//  -------- create token on user login --------
router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user) {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");
        console.log("error or no user in login route");
        return next(error);
      }
      req.login(user, { session: false }, function (err) {
        if (err) {
          console.log("from routes in req.login ", err);
          return err;
        }
        const body = { id: user.id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET");

        return res.json({ user: user, token: token });
      });
    } catch (err) {
      console.log("from routes in normal try/catch ", err);
      return err;
    }
  })(req, res, next);
});

// updates user
router.put(
  "/changePassword/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userController
        .changePassword(req)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// // updates user
// router.put(
//   "/resetPassword/:userId",
//   passport.authenticate("jwt", { session: false }),
//   function (req, res, next) {
//     if (verify(req.params.userId, req.query.secret_token)) {
//       return userController
//         .resetPass(req)
//         .then((user) => {
//           res.json(user);
//         })
//         .catch((err) => {
//           res.status(500).send({
//             message: err.message,
//           });
//         });
//     } else {
//       res.send({ status: "error", message: "Unauthorized Token" });
//     }
//   }
// );

// updates user
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userController
        .editUser(req)
        .then((user) => {
          res.json(user);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.put(
  "/savePushToken/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userController.saveToken(req).then((user) => {
        res.json(user);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

module.exports = router;
