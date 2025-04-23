var express = require("express");
var router = express.Router();
var userInterestController = require("../controllers/user_interests.js");
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

router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userInterestController
        .getAllUserInterests(req.params.userId)
        .then((interests) => {
          res.json(interests);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// get specific interests via id
router.get(
  "/getInterestById/:interestId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return userInterestController
      .getUserInterestById(req.params.interestId)
      .then((interests) => {
        res.json(interests);
      });
  }
);

router.post(
  "/addIntId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.user_id, req.query.secret_token)) {
      return userInterestController
        .addUserInterests(req)
        .then((interest) => {
          res.json(interest);
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

router.post(
  "/getUsersByInterestId",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    if (verify(req.body.userId, req.query.secret_token)) {
      return userInterestController
        .getUsersbyInterestId(req)
        .then((interest) => {
          res.json(interest);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.delete(
  "/:userId/:interestId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userInterestController
        .removeUserInterests(req.params.userId, req.params.interestId)
        .then((interest) => {
          if (interest == 1) {
            res.send({
              message: "user_interests was deleted successfully.",
            });
            res.json(interest);
          } else {
            res.send({
              message: `Cannot delete user_interests with user id=${req.params.userId} and interest id=${req.params.interestId} Maybe User was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete user_interests with User with id=" +
                req.params.userId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

module.exports = router;
