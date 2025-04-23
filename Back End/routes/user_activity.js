var express = require("express");
var router = express.Router();
const passport = require("../auth");
const jwt = require("jsonwebtoken");
var statusController = require("../controllers/user_activity.js");

var cors = require("cors");

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

    verified = payload.user.id == userId;
  });
  return verified;
}

// ADMIN CALLS
// get all flagged users
router.get(
  "/getFlagged/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.gymrat.app",
      "Access-Control-Allow-Credentials": true,
    });
    if (verify(req.params.id, req.query.secret_token)) {
      return statusController.getAllFlagged().then((users) => {
        if (users == null) {
          res.send({ data: [] });
        } else {
          res.send({ data: [users] });
        }
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// remove reported user
router.options(
  "/removeReported/:adminId/:fromUserId/:toUserId/:statusId/:reportId",
  cors()
);
router.delete(
  "/removeReported/:adminId/:fromUserId/:toUserId/:statusId/:reportId",
  cors(),
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    });
    if (verify(req.params.adminId, req.query.secret_token)) {
      return statusController
        .deleteRow(
          req.params.fromUserId,
          req.params.toUserId,
          req.params.statusId,
          req.params.reportId
        )
        .then((status) => {
          res.send({ status: [status] });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

///////////////

// get all blocked users by userId
router.get(
  "/getBlocked/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return statusController
        .getBlockedByUserId(req.params.userId)
        .then((status) => {
          res.json(status);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// unblock user
router.delete(
  "/deleteRow/:fromUserId/:toUserId/:statusId/:reportId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.fromUserId, req.query.secret_token)) {
      return statusController
        .deleteRow(
          req.params.fromUserId,
          req.params.toUserId,
          req.params.statusId,
          req.params.reportId
        )
        .then((status) => {
          res.json(status);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// reporting someone or blocking someone
router.post(
  "/addUserStatus",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.fromUserId, req.query.secret_token)) {
      return statusController
        .addUserStatus(req.body)
        .then((status) => {
          res.json(status);
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

// adding reported = 1 and blocked = 2
router.post(
  "/addStatus",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return statusController
      .addStatus(req.body)
      .then((status) => {
        res.json(status);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

module.exports = router;
