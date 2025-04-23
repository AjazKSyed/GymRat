var express = require("express");
var router = express.Router();
var userPicController = require("../controllers/user_pics.js");
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

// admin calls

router.get(
  "/admin_getall/:id/:limit/:offset",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.set({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://www.gymrat.app",
      "Access-Control-Allow-Credentials": true,
    });

    if (verify(req.params.id, req.query.secret_token)) {
      return userPicController
        .getAllImages(req.params.limit, req.params.offset)
        .then((pics) => {
          res.send({ data: [pics] });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.options("/admin_updatestatus/:id/:imgId", cors());
router.put(
  "/admin_updatestatus/:id/:imgId",
  cors(),
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    // res.set({
    //   "Content-Type": "application/json",
    //   "Access-Control-Allow-Origin": "*",
    //   "Access-Control-Allow-Credentials" : true

    // });
    if (verify(req.params.id, req.query.secret_token)) {
      return userPicController
        .updateStatus(req.params.imgId, req.body.status)
        .then((pics) => {
          res.send({ data: [pics] });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);
router.options("/admin_removeimg/:id/:imgId", cors());

router.delete(
  "/admin_removeimg/:id/:imgId",
  cors(),
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.id, req.query.secret_token)) {
      return userPicController.removeImg(req.params.imgId).then((pics) => {
        res.send({ data: [pics] });
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

/////----------------

// get all of a users pictures
router.get(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController
        .getAllUserPics(req.params.userId)
        .then((pics) => {
          res.json(pics);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.get(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return userPicController.getProfilePic(req.params.userId).then((pics) => {
      res.json(pics);
    });
  }
);

// add profile image
router.post(
  "/profile/:userId",
  passport.authenticate("jwt", { session: false }),
  userPicController.uploadProfile,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController.addProfilePic(req).then((pic) => {
        console.log("prof", pic);
        res.json(pic);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// Add gen0 image
router.post(
  "/general0/:userId",
  passport.authenticate("jwt", { session: false }),
  userPicController.uploadGen0,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController.addPic_General0(req).then((pic) => {
        console.log("gen 0", pic);
        res.json(pic);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// Add gen1 image
router.post(
  "/general1/:userId",
  passport.authenticate("jwt", { session: false }),
  userPicController.uploadGen1,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController.addPic_General1(req).then((pic) => {
        console.log("gen 1", pic);
        res.json(pic);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// Add gen2 image
router.post(
  "/general2/:userId",
  passport.authenticate("jwt", { session: false }),
  userPicController.uploadGen2,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController.addPic_General2(req).then((pic) => {
        console.log("gen 2", pic);
        res.json(pic);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// Add gen3 image
router.post(
  "/general3/:userId",
  passport.authenticate("jwt", { session: false }),
  userPicController.uploadGen3,
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController.addPic_General3(req).then((pic) => {
        console.log("gen 3", pic);
        res.json(pic);
      });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// Add all images
router.post(
  "/fullset/:userId",
  passport.authenticate("jwt", { session: false }),
  userPicController.uploadFull,
  function (req, res, next) {
    console.log("request from fullset call", req.body);
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController
        .addAllPics(req)
        .then((pic) => {
          res.json(pic);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

// this works, but doesnt delete from 'uploads' folder
router.delete(
  "/:userId/:picId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return userPicController
        .removeUserPics(req.params.userId, req.params.picId)
        .then((pic) => {
          // res.json(pic);
          if (pic == 1) {
            res.send({
              message: "user_pic was deleted successfully.",
            });
          } else {
            res.send({
              message: `Cannot delete user_pic with user id=${req.params.userId} and pic id=${req.params.picId} Maybe User was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete user_pic with User with id=" +
                req.params.userId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

router.put(
  "/byType/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      console.log(req.body);
      return userPicController
        .removeByType(req.params.userId, req.body.type)
        .then((pic) => {
          // res.json(pic);
          if (pic == 1) {
            res.send({
              message: "user_pic was deleted successfully.",
            });
          } else {
            res.send({
              message: `Cannot delete user_pic with user id=${req.params.userId} and pic id=${req.params.picId} Maybe User was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete user_pic with User with id=" +
                req.params.userId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

module.exports = router;
