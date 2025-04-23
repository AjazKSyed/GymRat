var express = require("express");
var router = express.Router();
const passport = require("../auth");
const jwt = require("jsonwebtoken");
var eventController = require("../controllers/events.js");

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

// create event by owner
// parameters  : name,bio,ownerId,imageId,long,lat,state,city
router.post(
  "/createEvent",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.userId, req.query.secret_token)) {
      return eventController
        .createEventforBatch(req)
        .then((eventStatus) => {
          res.json(eventStatus);
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

// delete event by owner
// parameters  : eventId
router.delete(
  "/deleteEvent/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .deleteEvent(req.params.eventId)
        .then((eventStatus) => {
          res.json(eventStatus);
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

// update event by owner
// parameters  : eventId, userId, postdata
router.put(
  "/updateEvent/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log(req.body);
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .updateEvent(req.params.eventId, req.body)
        .then((eventStatus) => {
          res.json(eventStatus);
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

// join event by user
router.post(
  "/joinEvent/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .joinEvent(req.params.eventId, req.params.userId)
        .then((eventStatus) => {
          res.json(eventStatus);
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

// leave event by user
router.delete(
  "/leaveEvent/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .leaveEvent(req.params.eventId, req.params.userId)
        .then((eventStatus) => {
          res.json(eventStatus);
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

// decide on event (not going, going) event (3 = going, 4 = not going, 5 = undecided)
// used for joining an event, leaving event, rsvping
// parameters  : eventId, userId, statusId
router.put(
  "/updateUserEventStatus/:eventId/:userId/:statusId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .updateUserStatus(req.params.eventId, req.params.userId, req.params.statusId)
        .then((eventStatus) => {
          res.json(eventStatus);
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

// get all past event
// parameters: eventId, userId, currentDate
router.get(
  "/getAllExpiredEvents/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .getAllExpiredEvents(req.params.userId, req.query.currentDate)
        .then((event) => {
          res.json(event);
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


// get all going events
router.get(
  "/getAllGoingEvents/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .getGoingEvents(req.params.userId)
        .then((event) => {
          res.json(event);
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

// get all owned events
router.get(
  "/getAllMyEvents/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return eventController
        .getMyEvents(req.params.userId)
        .then((event) => {
          res.json(event);
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

// get all events (by date = front end done first)
router.get(
  "/getAll/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
      return eventController
        .getAllEvents(req.params.userId)
        .then((event) => {
          res.json(event);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
  }
);

// search event
router.post(
  "/getEventByName",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.userId, req.query.secret_token)) {
      return eventController
        .searchEvent(req.body.eventName, req.body.userId)
        .then((event) => res.json(event));
    } else {
      res.send({ status: "error", message: "Unauthorized Token" });
    }
  }
);


// get event information by id
router.get(
  "/getEventInfo/:eventId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
      return eventController
        .getEventInfo(req.params.eventId)
        .then((event) => {
          res.json(event);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
  }
);


// return the status of user for event
router.get(
  "/getUserEventStatus/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
      return eventController
        .getUserEventStatus(req.params.userId, req.params.eventId)
        .then((event) => {
          res.json(event);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
  }
);

// returns all users who are going to event
router.get(
  "/getAllUsersGoing/:eventId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
      return eventController
        .getAllUsersGoing(req.params.eventId)
        .then((event) => {
          res.json(event);
        })
        .catch((err) => {
          res.status(500).send({
            message: err.message,
          });
        });
  }
);


// mutes the event
router.put(
  "/muteEvent/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return eventController
      .muteEvent(req.params.eventId, req.params.userId)
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

// unmutes the event
router.put(
  "/unmuteEvent/:eventId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return eventController
      .unmuteEvent(req.params.eventId, req.params.userId)
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

// checks the status of event notification
router.get(
  "/isEventMuted/:userId/:eventId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return eventController
      .checkEventMuted(req.params.userId, req.params.eventId)
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



// add message to event
/*
    fromuserId: user who sent message,
    toEventId: event id,
    body: message,
    request: notification request,
*/
router.post(
  "/addMessage",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.body.fromuserId, req.query.secret_token)) {
      return eventController
        .addMessage(req.body)
        .then((event) => {
          res.json(event);
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


// get messages for event
// params : eventId
// returns username,messages with timestamp by most recent to oldest
router.get(
  "/getEventMessages/:eventId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return eventController
      .getEventMessages(req.params.eventId)
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
