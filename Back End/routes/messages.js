var express = require("express");
var router = express.Router();
const passport = require("../auth");
const jwt = require("jsonwebtoken");
var messageController = require("../controllers/message.js");

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
    console.log(payload.user.id, userId);
    verified = payload.user.id == userId;
  });
  return verified;
}

// create groupchat + add members
router.post(
  "/creategroupchat/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return messageController
        .addGroupchat(req.body, req.params.userId)
        .then((groupchat) => {
          res.json(groupchat);
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

// edit groupchat name
router.put(
  "/editGroupchatName/:groupchatId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .editGroupchatName(req.params.groupchatId, req.body)
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

// add user to existing groupchat
router.post(
  "/addUser/:groupchatId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .addUser(req.params.groupchatId, req.body)
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

// get groupchats for id
// params : id (userId)
// returns groupchatId, groupname
router.get(
  "/getgroupchat/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .getGroupchats(req.params.userId)
      .then((groupchat) => {
        res.json(groupchat);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

router.get(
  "/isChatMuted/:userId/:groupChatId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .checkChatMuted(req.params.userId, req.params.groupChatId)
      .then((groupchat) => {
        res.json(groupchat);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

// get single dm groupchat (create or get existing one)
// params : (userId), (toUserId)
// returns groupchatId, groupname
router.get(
  "/getsinglegroupchat/:userId/:toUserId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .getSingleGroupchat(req.params.userId, req.params.toUserId)
      .then((groupchat) => {
        res.json(groupchat);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
);

// get participants
// params : id (userId)
// returns participants
router.get(
  "/participants/:groupchatId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .getGroupParticipants(req.params.groupchatId, req.params.userId)
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

// get groupchats for id
// params : id (userId)
// returns groupchatId, groupname
router.get(
  "/withoutFriends/:groupchatId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .getFriendsNotinChat(req.params.groupchatId, req.params.userId)
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

// mutes the chat
router.put(
  "/muteChat/:groupchatId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .muteChat(req.params.groupchatId, req.params.userId)
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

// unmutes the chat
router.put(
  "/unmuteChat/:groupchatId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .unmuteChat(req.params.groupchatId, req.params.userId)
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

// get messages for groupchat
// params : groupchatId
// returns username,messages with timestamp by most recent to oldest
router.get(
  "/getgroupchatmessages/:groupchatId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    return messageController
      .getGroupchatMessages(req.params.groupchatId)
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

// leave groupchat
router.delete(
  "/removeUser/:groupchatId/:userId",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    if (verify(req.params.userId, req.query.secret_token)) {
      return messageController
        .removeUser(req.params.groupchatId, req.params.userId)
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

// add message to groupchat
// fromuserId (assuming in groupchat), togroupchatId,body
router.post(
  "/addmessage",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    console.log(req.body);
    if (verify(req.body.fromuserId, req.query.secret_token)) {
      return messageController
        .addMessage(req.body)
        .then((groupchat) => {
          res.json(groupchat);
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




/* EVENT GROUP




/createEventforBatch
  parameters
    - name
    - bio
    - batchId

  insert into Events and create message row in gproupparticpants also

/DeleteEvent
  parameters
    - batchId

  remove volleyball event compelty and also message gc



/updateEventInfo
  parameters
    -eventId
    - columns that need to be updated

/joinEventUser/:eventId/:userId
  - add user to groupparticpants
    set status to not decided  and add gc also

/leaveEventUser
  parameters
    - eventId
    - userId
  remove from groupparticpants and gc


/updateEventStatusUser /:eventId/:userId
  - update grouparitcpants user status
    if user is going


/getAllEventUsersStatus/:eventId
  - return all users with status that are part of a event




  /listNearbyEvents/:id ****** Do later ******
 - find nearest from long and lat of user and events

  /getExpiredEvents  ****** Do later ******
    - returns all expired events today
      update event table  with info given this takes care of date call
    if its a date call then notify users in grouparticpaints

    if one time event then set date to null
    if recuriing update status for uusers and date
*/


module.exports = router;
