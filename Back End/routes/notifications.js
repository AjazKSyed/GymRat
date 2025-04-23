var express = require("express");
var router = express.Router();
var notificationController = require("../controllers/notifications.js");
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
      return notificationController
        .getAllNotifications(req.params.userId)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.get(
  "/getCountMessages/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .getAllMessageNotifications(req.params.userId)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.get(
  "/getCountFriendReqs/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .getAllRequestNotifications(req.params.userId)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.delete(
  "/clearFriendNotifications/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .clearFriendNotifications(req.params.userId)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.delete(
  "/clearMessageNotificationById/:userId/:groupId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .clearMessageNotificationById(req.params.userId, req.params.groupId)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.post(
  "/messageNotification/:userId/:groupId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .createMessageNotification(
          req.body,
          req.params.userId,
          req.params.groupId
        )
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.delete(
  "/deleteOne/:userId/:id",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .deleteNotification(req.params.userId, req.params.id)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.delete(
  "/deleteAll/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .deleteAllNotifications(req.params.userId)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.post(
  "/friendRequestNotification/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return notificationController
        .createFriendRequestNotification(req)
        .then((notification) => {
          res.json(notification);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// router.post(
//   "/messageNotification/:userId",
//   passport.authenticate("jwt", { session: false }),
//   function (req, res, next) {
//     if (verify(req.params.userId, req.query.secret_token)) {
//       return notificationController
//         .createMessageNotification(req.body, req.params.userId)
//         .then((notification) => {
//           res.json(notification);
//         });
//     } else {
//       res.send({ status: "error", message: "Unauthorized Token" });
//     }
//   }
// );

module.exports = router;
