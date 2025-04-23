var express = require("express");
var router = express.Router();
var userFriendController = require("../controllers/user_friends.js");
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

// grabs all friends
router.get(
  "/approved/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userFriendController
        .getAllUserFriends(req.params.userId)
        .then((friends) => {
          res.json(friends);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// grabs all requests
router.get(
  "/pending/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userFriendController
        .getAllRequests(req.params.userId)
        .then((requests) => {
          res.json(requests);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// adds friend request to table
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.userId, req.query.secret_token)) {
      return userFriendController
        .addFriendRequest(req.body)
        .then((friend) => {
          res.json(friend);
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

// updates friend request to approved
router.put(
  "/:userId/:friendUserId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userFriendController
        .updateRequest(req)
        .then((friend) => {
          if (friend == 1) {
            res.send({
              message: "Update Succesful.",
            });
            return;
          } else {
            res.send({
              message: `Cannot update friend with id=${req.params.friendUserId}. Maybe User was not found or req.body is empty or already updated!`,
            });
          }
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

router.delete(
  "/:userId/:friendUserId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userFriendController
        .removeUserFriends(req.params.userId, req.params.friendUserId)
        .then((friend) => {
          if (friend == 1) {
            res.send({
              message: "friend was deleted successfully.",
            });
            res.json(friend);
          } else {
            res.send({
              message: `Cannot delete friend with user id=${req.params.friendUserId}. Maybe friend was not found!`,
            });
          }
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

module.exports = router;
