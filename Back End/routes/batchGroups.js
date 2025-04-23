var express = require("express");
var router = express.Router();
const passport = require("../auth");
const jwt = require("jsonwebtoken");
var batchGroupController = require("../controllers/batchGroups.js");

// verify user
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
    console.log(payload.user.id, userId);
    verified = payload.user.id == userId;
  });
  return verified;
}

// create Batch for owner
// parameters  : name,bio,ownerId,long,lat,state,city
router.post(
  "/createBatch",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log(req.body);
    if (verify(req.body.ownerId, req.query.secret_token)) {
      return batchGroupController
        .createBatch(req.body)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// delete Batch
// parameters  : batchId
router.delete(
  "/deleteBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log(req.body);
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .deleteBatch(req.params.batchId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// edits Batch
// parameters: batchId, userId (validation), edits in body
router.put(
  "/updateBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .updateBatch(req.params.batchId, req.params.userId, req.body)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// Joins batch as user
// parameters  : batchId, userId
router.post(
  "/joinBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .joinBatch(req.params.batchId, req.params.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

/*
    // gets all pod info
    // // parameters: userId, podtype [batchId, eventId, groupchatId]
    // router.get(
    //   "/getAll/:userId",
    //   passport.authenticate("jwt", { session: false }),
    //   function (req, res, next) {
    //     if (verify(req.params.userId, req.query.secret_token)) {
    //       return batchGroupController
    //         .getAll(req.params.userId, req.query.podtype)
    //         .then((batchStatus) => {
    //           res.json(batchStatus);
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

*/

// leave batch as user
// parameters  : batchId, userId
router.delete(
  "/leaveBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .leaveBatchUser(req.params.batchId, req.params.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// kick user from batch (owner)
// parameters  : batchId, userId, ownerId
router.delete(
  "/kickUser/:batchId/:userId/:ownerId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.ownerId, req.query.secret_token)) {
      return batchGroupController
        .kickMemberFromBatch(
          req.params.batchId,
          req.params.userId,
          req.params.ownerId
        )
        .then((batchStatus) => {
          res.json(batchStatus);
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

// gets batch information
// parameters  : batchId
router.get(
  "/getBatchInfo/:batchId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return batchGroupController
      .getBatchInfo(req.params.batchId)
      .then((batchStatus) => {
        res.json(batchStatus);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

// gets all batches that are near
// parameters  : batchId
router.get(
  "/getClosestBatches/:userId/:userLong/:userLat/:distance",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .getClosestBatches(
          req.params.userId,
          req.params.userLong,
          req.params.userLat,
          req.params.distance
        )
        .then((batchStatus) => {
          res.json(batchStatus);
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

// gets batches that user has joined
// parameters  : userId
router.get(
  "/getJoinedBatches/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .getJoinedBatches(req.params.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// gets batches that user has created
// parameters  : userId
router.get(
  "/getOwnedBaches/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .getMyBatches(req.params.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// gets batch by name
// parameters  : userId, input (from body)
router.post(
  "/getBatchByName",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.userId, req.query.secret_token)) {
      return batchGroupController
        .searchBatch(req.body.batchName, req.body.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// invites users to batch by owner
// parameters  : batchId, userId, users (body)
router.post(
  "/inviteUsers/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .inviteUserToBatch(req.params.batchId, req.body)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// gets friends not in batch
// parameters  : batchId, ownerId, users (body)
router.get(
  "/getFriendsNotBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .getFriendsNotBatch(req.params.batchId, req.params.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// gets members of batch
// parameters  : batchId, userId
router.get(
  "/getMembers/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchGroupController
        .getMembers(req.params.batchId, req.params.userId)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// add message to batch
/*
    fromuserId: user who sent message,
    toBatchId: batch id,
    body: message,
    request: notification request,
*/
router.post(
  "/addMessage",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.fromuserId, req.query.secret_token)) {
      return batchGroupController
        .addMessage(req.body)
        .then((batchStatus) => {
          res.json(batchStatus);
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

// get messages for batch
// params : batchId
// returns username,messages with timestamp by most recent to oldest
router.get(
  "/getBatchMessages/:batchId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return batchGroupController
      .getBatchMessages(req.params.batchId)
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

// mutes the batch
router.put(
  "/muteBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return batchGroupController
      .muteBatch(req.params.batchId, req.params.userId)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

// unmutes the batch
router.put(
  "/unmuteBatch/:batchId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return batchGroupController
      .unmuteBatch(req.params.batchId, req.params.userId)
      .then((users) => {
        res.json(users);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

// checks the status of batch notification
router.get(
  "/isBatchMuted/:userId/:batchId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return batchGroupController
      .checkBatchMuted(req.params.userId, req.params.batchId)
      .then((batchStatus) => {
        res.json(batchStatus);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

module.exports = router;
