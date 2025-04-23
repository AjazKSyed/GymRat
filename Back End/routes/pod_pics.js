var express = require("express");
var router = express.Router();
var podPicsController = require("../controllers/pod_pics.js");
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

    verified = payload.user.id == userId;
  });
  return verified;
}

// add batch image
// parameter: userId, batchId, type = Batch
router.post(
  "/addBatchPic/:userId/:batchId",
  passport.authenticate("jwt", { session: false }),
  podPicsController.upload,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return podPicsController
        .addBatchPic(req.params.batchId, req.body.imgurl)
        .then((pic) => {
          console.log("batch", pic);
          res.json(pic);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// add event image
// parameter: userId, eventId, type = Event
router.post(
  "/addEventPic/:userId/:eventId",
  passport.authenticate("jwt", { session: false }),
  podPicsController.upload,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return podPicsController
        .addEventPic(req.params.eventId, req.body.imgurl)
        .then((pic) => {
          console.log("event", pic);
          res.json(pic);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// add groupchat image
// parameter: userId, groupchatId, type = Groupchat
router.post(
  "/addGroupchatPic/:userId/:groupchatId",
  passport.authenticate("jwt", { session: false }),
  podPicsController.upload,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return podPicsController
        .addGroupchatPic(req.params.groupchatId, req.body.imgurl)
        .then((pic) => {
          console.log("groupchat", pic);
          res.json(pic);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// removes batch image
// parameter: batchId, imageId, userId (validation)
router.delete(
  "/removeBatchPic/:batchId/:imageId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return podPicsController
        .removeBatchPic(req.params.batchId, req.params.imageId)
        .then((pic) => {
          if (pic == 1) {
            res.send({
              message: "batch image was deleted successfully.",
            });
          } else {
            res.send({
              message: `Cannot delete batch image with batch id=${req.params.batchId} and pic id=${req.params.imageId} Maybe batch was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete image with batch with id=" + req.params.batchId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// removes event image
// parameter: eventId, imageId, userId (validation)
router.delete(
  "/removeEventPic/:eventId/:imageId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return podPicsController
        .removeEventPic(req.params.eventId, req.params.imageId)
        .then((pic) => {
          if (pic == 1) {
            res.send({
              message: "event image was deleted successfully.",
            });
          } else {
            res.send({
              message: `Cannot delete event image with event id=${req.params.eventId} and pic id=${req.params.imageId} Maybe event was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete image with event with id=" + req.params.eventId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// removes groupchat image
// parameter: groupchatId, imageId, userId (validation)
router.delete(
  "/removeGroupchatPic/:groupchatId/:imageId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return podPicsController
        .removeGroupPic(req.params.groupchatId, req.params.imageId)
        .then((pic) => {
          if (pic == 1) {
            res.send({
              message: "groupchat image was deleted successfully.",
            });
          } else {
            res.send({
              message: `Cannot delete groupchat image with batch id=${req.params.groupchatId} and pic id=${req.params.imageId} Maybe groupchat was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete image with groupchat with id=" +
                req.params.groupchatId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// gets batch image
// parameter: batchId
router.get(
  "/getBatchPic/:batchId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return podPicsController.getBatchPic(req.params.batchId).then((pics) => {
      res.json(pics);
    });
  }
);

// gets event image
// parameter: eventId
router.get(
  "/getEventPic/:eventId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return podPicsController.getEventPic(req.params.eventId).then((pics) => {
      res.json(pics);
    });
  }
);

// gets groupchat image
// parameter: groupchatId
router.get(
  "/getGroupchatPic/:groupchatId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return podPicsController
      .getGroupchatPic(req.params.groupchatId)
      .then((pics) => {
        res.json(pics);
      });
  }
);

/* admin calls */

// getAllPodImages
router.get(
  "/admin_getAllPodImages/:id/:limit/:offset",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.gymrat.app",
      "Access-Control-Allow-Credentials": true,
    });

    if (verify(req.params.id, req.query.secret_token)) {
      return podPicsController
        .getAllPodImages(req.params.limit, req.params.offset)
        .then((pics) => {
          res.send({ data: [pics] });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// updatePodPicStatus
router.options("/admin_updatePodPicStatus/:id/:imgId", cors());
router.put(
  "/admin_updatePodPicStatus/:id/:imgId",
  cors(),
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    // res.set({
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials" : true

    // });
    if (verify(req.params.id, req.query.secret_token)) {
      return podPicsController
        .updatePodPicStatus(req.params.imgId, req.body.status)
        .then((pics) => {
          res.send({ data: [pics] });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

//removePic
router.options("/admin_removePic/:id/:imgId", cors());
router.delete(
  "/admin_removePic/:id/:imgId",
  cors(),
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.id, req.query.secret_token)) {
      return podPicsController.removePic(req.params.imgId).then((pics) => {
        res.send({ data: [pics] });
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

/* end of admin calls */

module.exports = router;
