var express = require("express");
var router = express.Router();
var bannedController = require("../controllers/banned_users.js");
const passport = require("../auth");
const jwt = require("jsonwebtoken");
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
    // Both should be the same
    verified = payload.user.id == userId;
  });
  return verified;
}
router.post(
  "/admin_ban/:id/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    });
    if (verify(req.params.id, req.query.secret_token)) {
      return bannedController.banUser(req).then((user) => {
        res.json(user);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.options("/admin_allbanned/:id", cors());
router.get(
  "/admin_allbanned/:id",
  cors(),
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.id, req.query.secret_token)) {
      return bannedController.getAllBannedUsers().then((user) => {
        res.json(user);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

module.exports = router;
