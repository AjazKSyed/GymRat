const models = require("../models");
const notification = models.notification;
const messages = models.messages;
const groupchat = models.groupchat;
const groupparticipants = models.groupparticipants;
const { literal, Op, query, QueryTypes } = require("sequelize");
const user = models.user;
const { sequelize } = require("../models");
const { Expo } = require("expo-server-sdk");
const expo = new Expo();

function errorCheck(tickets) {
  /* ** EXPLANATION FOR CHECK **

  Later, after the Expo push notification service has delivered the
  notifications to Apple or Google (usually quickly, but allow the the service
  up to 30 minutes when under load), a "receipt" for each notification is
  created. The receipts will be available for at least a day; stale receipts
  are deleted.

  The ID of each receipt is sent back in the response "ticket" for each
  notification. In summary, sending a notification produces a ticket, which
  contains a receipt ID you later use to get the receipt.

  The receipts may contain error codes to which you must respond. In
  particular, Apple or Google may block apps that continue to send
  notifications to devices that have blocked notifications or have uninstalled
  your app. Expo does not control this policy and sends back the feedback from
  Apple and Google so you can handle it appropriately.

  */
  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  (async () => {
    for (let chunk of receiptIdChunks) {
      try {
        let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
        console.log(receipts);

        for (let receiptId in receipts) {
          let { status, message, details } = receipts[receiptId];
          if (status === "ok") {
            continue;
          } else if (status === "error") {
            console.error(
              `There was an error sending a notification: ${message}`
            );
            if (details && details.error) {
              console.error(`The error code is ${details.error}`);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  })();
}

// Returns all notifications
async function getAllNotifications(id) {
  const notifs = await notification.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      userId: id,
    },
  });
  return notifs;
}

// Createa a notification for a new message
async function createMessageNotification(body, id, messageGroupId) {
  const participants = JSON.parse(body.participants);
  console.log("messageGroupId", messageGroupId);
  const sender = await sequelize.query(
    `select users."fullName" from users where id = ${id}`,
    { type: sequelize.QueryTypes.SELECT }
  );
  const user_name = sender[0].fullName;
  console.log(sender);

  Array.prototype.forEach.call(participants, async (u_id) => {
    var notifications = [];
    const existingUser = await user.findOne({
      where: {
        id: u_id,
      },
    });

    if (!Expo.isExpoPushToken(existingUser.pushTokenKey)) {
      console.log(
        `Push token ${existingUser.pushTokenKey} is not a valid Expo push token`
      );
      return;
    }

    const userMuted = await sequelize.query(
      `select groupparticipants.muted from groupparticipants where \"groupchatId\" = ${messageGroupId} AND \"userId\" = ${u_id} AND muted=TRUE LIMIT 1;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    console.log(userMuted);

    let isChatMuted = false;
    if (userMuted.length > 0) {
      if (userMuted[0].muted == TRUE) {
        isChatMuted = true;
        console.log("ture ture");
      }
    }
    /* Direct Message (chat size = 1) */
    if (participants.length == 1) {
      if (isChatMuted == false) {
        notifications.push({
          to: existingUser.pushTokenKey,
          sound: "default",
          title: `${user_name}`,
          body: "New Message",
          data: { withSome: "data" },
        });
      }
      let message = notification.create({
        payload: `${user_name}`,
        message: `message`,
        fromId: id,
        userId: u_id,
        groupId: messageGroupId,
      });
    } else {
      if (isChatMuted == false) {
        /* Group Message (chat size > 1) */
        notifications.push({
          to: existingUser.pushTokenKey,
          sound: "default",
          title: `${body.groupName}`,
          body: `New message from ${user_name}`,
          data: { withSome: "data" },
        });
      }
      let message = notification.create({
        payload: `${body.groupName}`,
        message: `message from ${user_name}`,
        fromId: id,
        userId: u_id,
        groupId: messageGroupId,
      });
    }

    let chunks = expo.chunkPushNotifications(notifications);
    let tickets = [];

    try {
      for (const chunk of chunks) {
        console.log(chunk);
        try {
          const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          console.log(ticketChunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  });
  return "Message Notifications Sent";
}

// Deletes a single notification
async function deleteNotification(userId, id) {
  const deletedNotif = notification.destroy({
    where: {
      userId: userId,
      id: id,
    },
  });
  return deletedNotif;
}

// Deletes all notifications
async function deleteAllNotifications(userId) {
  const clearedNotifications = notification.destroy({
    where: {
      userId: userId,
    },
  });
  return clearedNotifications;
}

// Creates notification for a friend request
async function createFriendRequestNotification(req) {
  /*
  req:
    senderId (current user id)
    gotId: body.id (other friend)
    message: New Friend Request
    title: `${postData.user_first_name} ${postData.user_last_name}`,
  */
  const message = "New Friend Request";
  console.log(req.body);
  const gotId = JSON.parse(req.body.friendId);
  const senderId = req.params.userId;

  const sender = await sequelize.query(
    `select users."fullName" from users where id = ${req.params.userId}`,
    { type: sequelize.QueryTypes.SELECT }
  );
  const title = sender[0].fullName;

  var notifications = [];
  const existingUser = await user.findOne({
    where: {
      id: gotId,
    },
  });

  if (!Expo.isExpoPushToken(existingUser.pushTokenKey)) {
    console.error(
      `Push token ${existingUser.pushTokenKey} is not a valid Expo push token`
    );
    return;
  }

  notifications.push({
    to: existingUser.pushTokenKey,
    sound: "default",
    title: title,
    body: message,
    data: { withSome: "data" },
  });

  let frNot = await notification.create({
    payload: title,
    message: message,
    fromId: senderId,
    userId: gotId,
  });

  let chunks = expo.chunkPushNotifications(notifications);
  let tickets = [];

  try {
    for (const chunk of chunks) {
      console.log(chunk);
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
      }
    }
  } catch (error) {
    console.error(error);
  }
  return "Friend Request Notification Sent";
}

// Deletes all message notifications for a user
async function clearMessageNotificationById(userId, groupId) {
  const notificationCleared = notification.destroy({
    where: {
      userId: userId,
      groupId: groupId,
    },
  });
  return notificationCleared;
}

// Deletes all friend request notifications for a user
async function clearFriendNotifications(userId) {
  const notificationCleared = notification.destroy({
    where: {
      userId: userId,
      message: {
        [Op.like]: "New Friend Request",
      },
    },
  });
  return notificationCleared;
}

// Returns all message notifications for a user
async function getAllMessageNotifications(userId) {
  const count = notification.count({
    where: {
      userId: userId,
      message: {
        [Op.notLike]: "New Friend Request",
      },
    },
  });
  return count;
}

// Returns all friend request notifications for a user
async function getAllRequestNotifications(userId) {
  const count = notification.count({
    where: {
      userId: userId,
      message: {
        [Op.like]: "New Friend Request",
      },
    },
  });
  return count;
}

module.exports = {
  getAllNotifications: getAllNotifications,
  deleteNotification: deleteNotification,
  deleteAllNotifications: deleteAllNotifications,
  createMessageNotification: createMessageNotification,
  createFriendRequestNotification: createFriendRequestNotification,

  clearMessageNotificationById: clearMessageNotificationById,
  clearFriendNotifications: clearFriendNotifications,
  getAllRequestNotifications: getAllRequestNotifications,
  getAllMessageNotifications: getAllMessageNotifications,
};
