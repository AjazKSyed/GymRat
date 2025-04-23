var express = require("express");
var router = express.Router();
var interestController = require("../controllers/interests.js");
const passport = require("../auth");
const jwt = require("jsonwebtoken");
// get all interests
router.get("/", function (req, res, next) {
  return interestController.getAllInterests().then((interests) => {
    res.json(interests);
  });
});

// adding interest
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return interestController.createInterest(req.body).then((interests) => {
      res.json(interests);
    });
  }
);

module.exports = router;
