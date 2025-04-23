var express = require("express");
var router = express.Router();
var batchInterestController = require("../controllers/batchInterests.js");
const passport = require("../auth");
const jwt = require("jsonwebtoken");

// verifies that token is for the each batch
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
  "/:batchId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
      return batchInterestController
        .getAllBatchInterests(req.params.batchId)
        .then((interests) => {
          res.json(interests);
        });
  }
);

router.post(
  "/addInterest/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchInterestController
        .addBatchInterest(req)
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


router.delete(
  "/:userId/:batchId/:interestId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return batchInterestController
        .removeBatchInterests(req.params.batchId, req.params.interestId)
        .then((interest) => {
          if (interest == 1) {
            res.send({
              message: "batch_interests was deleted successfully.",
            });
            res.json(interest);
          } else {
            res.send({
              message: `Cannot delete batch_interests with batch id=${req.params.batchId} and interest id=${req.params.interestId} Maybe batch was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Could not delete batch_interests with batch with id=" +
                req.params.batchId,
          });
        });
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);

module.exports = router;
