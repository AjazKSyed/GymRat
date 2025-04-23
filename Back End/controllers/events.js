const { literal, Op, query, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const models = require("../models");
const BatchGroup = models.BatchGroup;
const Event = models.Events;
const GroupParticipants = models.groupparticipants;
const pics = models.pod_pics;
const { normalizeText } = require("normalize-text");
const Message = models.messages;
const User = models.user;
const interests = models.interest;
const userPics = models.user_pic;

// creates event for batch
// parameters: batchId, ownerId, name, bio, address, long, lat, state, city, date
async function createEventforBatch(req) {
  const batchId = JSON.parse(req.body.batchId);
  const longitude = JSON.parse(req.body.long);
  const latitude = JSON.parse(req.body.lat);

  var status = 3;
  try {
    const createEvent = await sequelize.query(
      `
    INSERT INTO \"Events\"
    ("batchId", "name", "bio", "address", "long", "lat", "state", "city", "date")
    VALUES
    (${batchId}, '${req.body.name}', '${req.body.bio}', '${req.body.address}', ${longitude}, ${latitude}, '${req.body.state}',  '${req.body.city}',  '${req.body.date}')
    RETURNING "id";
    `
    );

    const eventId = createEvent[0][0]["id"];

    await sequelize.query(
      `
    INSERT INTO groupparticipants
    ("userId", "muted", "eventId", "status")
    VALUES
    (${req.body.userId}, FALSE, ${eventId}, ${status} );
    `
    );
    return `event has been created named event${createEvent[0][0]["id"]}`;
  } catch (error) {
    console.log(error);
  }
}

// shouldnt we delete from groupparticipants as well?
async function deleteEvent(eventId) {
  // delete all messages assoicated with eventId
  const deletedMessages = await Message.destroy({
    where: {
      toEventId: eventId,
    },
  });
  const deletedGroupParticipants = await GroupParticipants.destroy({
    where: {
      eventId: eventId,
    },
  });
  // delete all messages assoicated with eventId
  const deletedEvent = await Event.destroy({
    where: {
      id: eventId,
    },
  });

  return `Event with id ${eventId} has been deleted`;
}

// updates information for event
async function updateEvent(eventId, postData) {
  try {
    const updatedEvent = await Event.update(postData, {
      where: {
        id: eventId,
      },
    });
    return `Event Updated`;
  } catch (error) {
    console.log(error);
  }
}

// updates information for event
async function joinEvent(eventId, userId) {
  let status = 5;
  const joinEvent = await sequelize.query(
    `
    INSERT INTO groupparticipants
    ("userId", "muted", "eventId", "status")
    VALUES
    (${userId}, FALSE, ${eventId}, ${status} );
    `
  );

  return `User${userId} joined event${eventId} as undecided`;
}

// updates information for event
async function leaveEvent(eventId, userId) {
  const leave = await GroupParticipants.destroy({
    where: {
      userId: userId,
      eventId: eventId,
    },
  });

  return `User${userId} left event${eventId}`;
}
/*
   updates the status for event for user in groupparticipants
   used for joining, leaving, and rsvping for event'
   parameters: eventId, userId, statusId
   statusId: (3 = going, 4 = not going, 5 = undecided)
*/
async function updateUserStatus(eventId, userId, statusId) {
  const updatedStatus = await GroupParticipants.update(
    { status: statusId },
    {
      where: {
        eventId: eventId,
        userId: userId,
      },
    }
  );
  let decision = statusId == 4 ? "not going" : "going";
  return `user decided to choose ${decision}`;
}

/*
   Returns all expired Events
   parameters: userId, currentDate
   current Date is in iso8061 format (YYYY-MM-DD) (utc time)
   we compare the date in database to currentDate, and return events that are past
*/
async function getAllExpiredEvents(userId, currentDate) {
  // list of event ids that user is part of
  const eventsUserPartOf = await GroupParticipants.findAll({
    attributes: ["eventId"],
    where: {
      userId: userId,
      eventId: {
        [Op.ne]: null,
      },
      status: {
        [Op.between]: [3, 5],
      },
    },
  });

  let eventsArr = [];

  eventsUserPartOf.forEach((ids) => {
    eventsArr.push(ids.eventId);
  });

  let pastEvents = await Event.findAll({
    where: {
      id: {
        [Op.in]: eventsArr,
      },
      date: {
        [Op.lt]: currentDate,
      },
    },
    include: [
      {
        model: pics,
      },
    ],
    order: [["date", "DESC"]],
  });

  return pastEvents;
}

// returns events user is going to
async function getGoingEvents(userId) {
  // list of event ids that user is part of
  const eventsJoined = await GroupParticipants.findAll({
    attributes: ["eventId"],
    where: {
      userId: userId,
      eventId: {
        [Op.ne]: null,
      },
      status: 3,
    },
  });

  let eventsArr = [];

  eventsJoined.forEach((ids) => {
    eventsArr.push(ids.eventId);
  });
  console.log(eventsJoined);
  let rsvpdEvents = await Event.findAll({
    where: {
      id: {
        [Op.in]: eventsArr,
      },
    },
    include: [
      {
        model: pics,
      },
    ],
    order: [["date", "ASC"]],
  });
  return rsvpdEvents;
}

// return events owned by user
async function getMyEvents(userId) {
  const batchOwned = await BatchGroup.findAll({
    attributes: ["id"],
    where: {
      ownerId: userId,
    },
  });
  let batchesArr = [];

  batchOwned.forEach((ids) => {
    batchesArr.push(ids.id);
  });

  let myEvents = await Event.findAll({
    where: {
      batchId: {
        [Op.in]: batchesArr,
      },
    },
    include: [
      {
        model: pics,
      },
    ],
    order: [["date", "ASC"]],
  });
  return myEvents;
}

// gets all events from all batches user is part and events user has joined
// ?? should we include if user is going or not ??
async function getAllEvents(userId) {
  // order by the date (involves converting date - know after front end done)

  // batches user has joined
  const batchesUserJoined = await GroupParticipants.findAll({
    attributes: ["batchId"],
    where: {
      userId: userId,
      batchId: {
        [Op.ne]: null,
      },
    },
  });

  let batchesArr = [];

  batchesUserJoined.forEach((ids) => {
    batchesArr.push(ids.batchId);
  });

  // events from batches user is part of
  const eventsFromUserBatches = await Event.findAll({
    attributes: ["id"],
    where: {
      batchId: {
        [Op.in]: batchesArr,
      },
    },
  });

  // events user has joined (going, undecided, not going)
  const eventsUserPartOf = await GroupParticipants.findAll({
    attributes: ["eventId"],
    where: {
      userId: userId,
      eventId: {
        [Op.ne]: null,
      },
      status: {
        [Op.between]: [3, 5],
      },
    },
  });

  let allEventIds = [];

  eventsFromUserBatches.forEach((ids) => {
    allEventIds.push(ids.eventId);
  });
  eventsUserPartOf.forEach((ids) => {
    allEventIds.push(ids.eventId);
  });

  // grab a combination of both events from batches and events joined
  const allEvents = await Event.findAll({
    where: {
      id: {
        [Op.in]: allEventIds,
      },
    },
    include: [
      {
        model: pics,
      },
    ],

    order: [["date", "ASC"]],
  });

  return allEvents;
}

// search for event
async function searchEvent(name, userId) {
  const eventName = normalizeText(name);
  const ownerId = JSON.parse(userId);

  const batchOwned = await BatchGroup.findAll({
    attributes: ["id"],
    where: {
      ownerId: ownerId,
    },
  });

  let batchesArr = [];

  batchOwned.forEach((ids) => {
    batchesArr.push(ids.id);
  });

  const events = await Event.findAll({
    where: {
      [Op.and]: [
        {
          name: { [Op.iLike]: sequelize.literal(`\'${eventName}%\'`) },
        },
        {
          batchId: {
            [Op.notIn]: batchesArr,
          },
        },
      ],
    },
    include: [
      {
        model: pics,
      },
    ],
  });

  return events;
}

// gets an event info via eventId
async function getEventInfo(eventId) {
  const eventInfo = await Event.findAll({
    where: {
      id: eventId,
    },
    include: [
      {
        model: pics,
      },
    ],
  });
  return eventInfo;
}

// return the status of user for event
async function getUserEventStatus(userId, eventId) {
  const userStatus = await GroupParticipants.findAll({
    attributes: ["status"],
    where: {
      userId: userId,
      eventId: eventId,
    },
  });
  return userStatus;
}

// returns all users who are going to event
async function getAllUsersGoing(eventId) {
  const usersGoing = await GroupParticipants.findAll({
    attributes: ["userId"],
    where: {
      eventId: eventId,
      status: 3,
    },
    order: [["createdAt"]],
  });
  let users = [];

  usersGoing.forEach((ids) => {
    users.push(ids.userId);
  });

  const usersInfo = await User.findAll({
    where: {
      id: {
        [Op.in]: users,
      },
    },
    include: [
      {
        model: userPics,
      },
      {
        model: interests,
      },
    ],
  });
  return usersInfo;
}

// Mutes a event chats's notifications for a user
async function muteEvent(eventId, userId) {
  const muted = await GroupParticipants.update(
    {
      muted: true,
    },
    {
      where: {
        eventId: eventId,
        userId: userId,
      },
    }
  );

  return `muted event ${eventId}'s chat for user ${userId}`;
}

// Unmutes a event chats's notifications for a user
async function unmuteEvent(eventId, userId) {
  const muted = await GroupParticipants.update(
    {
      muted: false,
    },
    {
      where: {
        eventId: eventId,
        userId: userId,
      },
    }
  );

  return `unmuted event ${eventId}'s chat for user ${userId}`;
}

// Checks which event are muted for a user
async function checkEventMuted(userId, eventId) {
  const isMuted = await GroupParticipants.findAll({
    attributes: ["muted"],
    where: {
      eventId: eventId,
      userId: userId,
    },
  });
  return isMuted;
}

// Creates a message in a event
async function addMessage(postData) {
  var id = 0;
  var eventId = 0;
  const m = await Message.create({
    fromuserId: postData.fromuserId,
    toEventId: postData.toEventId,
    body: postData.body,
    request: postData.request,
  }).then(function (x) {
    id = x.id;
    eventId = x.toEventId;
  });

  await sequelize.query(`
    update "Events" set "updatedAt" = messages."createdAt" from messages where messages.id = ${id} and "Events"."id" = ${eventId};
  `);

  return "Message Added";
}
// Returns all messages for a event
async function getEventMessages(eventId) {
  try {
    const data = await sequelize.query(
      `select users."fullName",users.id, messages.body,messages."createdAt" from users,messages where messages."toEventId" = ${eventId} AND messages."fromuserId" = users.id order by messages."createdAt" desc`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getEventMessages: getEventMessages,
  addMessage: addMessage,

  checkEventMuted: checkEventMuted,
  unmuteEvent: unmuteEvent,
  muteEvent: muteEvent,

  getAllUsersGoing: getAllUsersGoing,
  getEventInfo: getEventInfo,

  searchEvent: searchEvent,
  getAllEvents: getAllEvents,
  getMyEvents: getMyEvents,
  getGoingEvents: getGoingEvents,
  getAllExpiredEvents: getAllExpiredEvents,

  getUserEventStatus: getUserEventStatus,
  updateUserStatus: updateUserStatus,
  joinEvent: joinEvent,
  leaveEvent: leaveEvent,

  updateEvent: updateEvent,
  deleteEvent: deleteEvent,
  createEventforBatch: createEventforBatch,
};
