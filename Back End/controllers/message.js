const models = require("../models");
const Message = models.messages;
const User = models.user;
const pics = models.user_pic;
const groupchat = models.groupchat;
const GroupParticipants = models.groupparticipants;
const user_friends = models.user_friend;
const interests = models.interest;

const { literal, Op, query, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");

/*
  # get all gc with count of two
  # find grouopchat user is in with count of two
  # find if friend and user have groupchat
  */
async function addGroupchat(postData, userId) {
  const participants = JSON.parse(postData.participants);

  if (participants.length == 1) {
    // private groupchat
    const isGroupchatExist = await sequelize.query(
      `SELECT "groupchatId" from groupparticipants
        WHERE "userId" = ${participants[0]} AND "groupchatId" IN (
          SELECT "groupchatId" FROM groupparticipants
           WHERE "userId" = ${userId} AND "groupchatId" IN (
            SELECT "groupchatId" FROM groupparticipants GROUP BY "groupchatId" HAVING COUNT("userId") = 2
           )
        );
      `
    );
    console.log(isGroupchatExist);
    if (isGroupchatExist[0].length == 1) {
      return "Groupchat already exists";
    }
  }

  lenofData = Object.keys(postData).length;
  // create groupchat name

  const createGroupchatName = await sequelize.query(
    "Insert into groupchat values (nextval('\"groupchat_groupchatId_seq\"'::regclass),'" +
      postData.groupname +
      '\') RETURNING "groupchatId";'
  );
  const groupId = createGroupchatName[0][0]["groupchatId"];

  console.log(groupId, userId);

  try {
    await sequelize.query(
      `
      INSERT INTO groupparticipants
      ("userId", "muted", "groupchatId")
      VALUES
      (${userId}, FALSE, ${groupId});
      `
    );

    for (let i = 0; i < participants.length; i++) {
      await sequelize.query(
        `
        INSERT INTO groupparticipants
        ("userId", "muted", "groupchatId")
        VALUES
        (${participants[i]}, FALSE, ${groupId});
        `
      );
    }
    return { groupName: postData.groupname, groupId: groupId };
  } catch (error) {
    console.log(error);
    await sequelize.query(
      'Delete from groupchat where "groupchatId" = ' + groupId + ";"
    );

    return error;
  }
}

// Edits groupchat name
async function editGroupchatName(groupchatId, postData) {
  try {
    const newName = await sequelize.query(
      `Update groupchat set groupname= '${postData.groupname}' where \"groupchatId\" = ${groupchatId};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return "Groupname has been updated";
  } catch (error) {
    return error;
  }
}

async function getGroupParticipants(groupchatId, userId) {
  const friendIds = await sequelize.query(
    `select user_friends."friendUserId" from user_friends where user_friends."userId" = ${userId}
  AND user_friends.status = 'APPROVED'`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const pend_sent = await sequelize.query(
    `select user_friends."friendUserId" from user_friends where user_friends."userId" = ${userId}
  AND user_friends.status = 'PENDING' AND user_friends."sentId" = ${userId}`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const pend_rec = await sequelize.query(
    `select user_friends."friendUserId" from user_friends where user_friends."userId" = ${userId}
  AND user_friends.status = 'PENDING' AND user_friends."sentId" != ${userId}`,
    { type: sequelize.QueryTypes.SELECT }
  );

  let sent = [];
  let rec = [];
  let fri = [];

  pend_rec.forEach((ids) => {
    rec.push(ids.friendUserId);
  });

  pend_sent.forEach((ids) => {
    sent.push(ids.friendUserId);
  });

  friendIds.forEach((ids) => {
    fri.push(ids.friendUserId);
  });

  const participants = await sequelize.query(
    `select users."firstName", users."lastName", users.id from users, groupparticipants where groupparticipants."groupchatId" = ${groupchatId}
  AND groupparticipants."userId" != ${userId}
  AND groupparticipants."userId" = users.id`,
    { type: sequelize.QueryTypes.SELECT }
  );

  let finalPart = [];
  participants.forEach((user) => {
    fr_status = fri.includes(user.id)
      ? "APPROVED"
      : sent.includes(user.id)
      ? "REQUESTED"
      : rec.includes(user.id)
      ? "RECEIVED"
      : "NONE";

    finalPart.push({
      firstName: user.firstName,
      lastName: user.lastName,
      id: user.id,
      friendStatus: fr_status,
    });
  });

  return finalPart;
}

// Returns friends who are not in the groupchat
async function getFriendsNotinChat(groupchatId, userId) {
  const friends = await sequelize.query(
    `select user_friends."friendUserId", users."fullName" from user_friends,users where user_friends."userId" = ${userId}
  AND user_friends."friendUserId" NOT IN (select groupparticipants."userId" from groupparticipants where groupparticipants."groupchatId" = ${groupchatId} AND groupparticipants."userId" != ${userId}) AND users.id = user_friends."friendUserId" AND user_friends.status = 'APPROVED'`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return friends;
}

// Returns all groupchats for the user
async function getGroupchats(userId) {
  const aste = await sequelize.query(
    `
    select
    *
  from
    (
      select
        groupchat."groupchatId",
        "groupname",
        groupchat."updatedAt"
      from
        groupparticipants,
        groupchat
      where
        groupparticipants."groupchatId" in (
          select
            "groupchatId"
          from
            groupparticipants
          where
            "userId" = ${userId}
        )
        and groupparticipants."groupchatId" = groupchat."groupchatId"
      group by
        (
          groupchat."groupchatId", groupchat."groupname",
          groupchat."updatedAt"
        )
      having
        count(*) > 2
      UNION
      select
        groupparticipants."groupchatId",
        users."fullName" as "groupname",
        groupchat."updatedAt"
      from
        groupparticipants,
        users,
        groupchat
      where
        groupchat."groupchatId" = groupparticipants."groupchatId"
        and users."id" = groupparticipants."userId"
        and "userId" in (
          select
            "userId"
          from
            groupparticipants
          where
            "userId" != ${userId}
        )
        and groupparticipants."groupchatId" in (
          select
            groupparticipants."groupchatId"
          from
            groupparticipants
          where
            groupparticipants."groupchatId" in (
              select
                "groupchatId"
              from
                groupparticipants
              where
                "userId" = ${userId}
            )
          group by
            (
              groupparticipants."groupchatId",
              groupchat."updatedAt"
            )
          having
            count(*) = 2
        )
    ) as t
  order by
    "updatedAt" desc;

   `
  );

  const mutedOnes = await sequelize.query(
    `select muted, "groupchatId" from groupparticipants where "userId" = ${userId}`
  );
  return aste[0];
}

// Returns a single groupchat for the user
async function getSingleGroupchat(userId, toUserId) {
  const existingGC = await sequelize.query(
    'select groupparticipants."groupchatId",users."fullName" as "groupname",groupchat."updatedAt" from groupparticipants,users,groupchat where groupchat."groupchatId" =groupparticipants."groupchatId" and users."id" =groupparticipants."userId" and "userId" in (select "userId" from groupparticipants where "userId"!=' +
      userId +
      ' ) and groupparticipants."userId" = ' +
      toUserId +
      ' and groupparticipants."groupchatId" in  (select groupparticipants."groupchatId" from groupparticipants where groupparticipants."groupchatId" in (select "groupchatId" from groupparticipants where "userId" = ' +
      userId +
      ' ) group by (groupparticipants."groupchatId",groupchat."updatedAt") having count(*) = 2)'
  );

  if (existingGC[0].length == 1) {
    console.log("Groupchat already exists");
    return existingGC[0];
  }
  console.log("Creating new groupchat");

  const createGroupchatName = await sequelize.query(
    "Insert into groupchat values (nextval('\"groupchat_groupchatId_seq\"'::regclass),'') RETURNING \"groupchatId\";"
  );
  const groupchatId = createGroupchatName[0][0]["groupchatId"];
  await sequelize.query(
    `
    INSERT INTO groupparticipants
    ("userId", "muted", "groupchatId")
    VALUES
    (${userId}, FALSE, ${groupchatId});
    `
  );
  await sequelize.query(
    `
    INSERT INTO groupparticipants
    ("userId", "muted", "groupchatId")
    VALUES
    (${toUserId}, FALSE, ${groupchatId});
    `
  );

  return groupchatId;
}

// Returns all messages for a groupchat
async function getGroupchatMessages(groupchatId) {
  try {
    const data = await sequelize.query(
      `select users."fullName",users.id, messages.body,messages."createdAt" from users,messages where messages."toGroupchatId" = ${groupchatId} AND messages."fromuserId" = users.id order by messages."createdAt" desc`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return data;
  } catch (error) {
    return error;
  }
}

// Removes a user from a groupchat
async function removeUser(groupchatId, userId) {
  try {
    const removeUser = await sequelize.query(
      'Delete from groupparticipants where "userId" =' +
        userId +
        'and "groupchatId" = ' +
        groupchatId +
        ";"
    );
    await sequelize.query(
      'delete from groupchat where "groupchatId"  not in (select distinct "groupchatId" from groupparticipants );'
    );
    return "User have been removed from groupchat";
  } catch (error) {
    return error;
  }
}

// Creates a message in a groupchat
async function addMessage(postData) {
  var id = 0;
  var gcId = 0;
  const m = await Message.create({
    fromuserId: postData.fromuserId,
    toGroupchatId: postData.togroupchatId,
    body: postData.body,
    request: postData.request,
  }).then(function (x) {
    id = x.id;
    gcId = x.toGroupchatId;
  });

  await sequelize.query(
    'update groupchat set "updatedAt" = messages."createdAt" from messages where messages.id =' +
      id +
      ' and groupchat."groupchatId" = ' +
      gcId +
      ";"
  );

  return "Message Added";
}

// Adds a user to a groupchat
async function addUser(groupchatId, postData) {
  const participants = JSON.parse(postData.participants);
  try {
    for (let i = 0; i < participants.length; i++) {
      await sequelize.query(
        `
        INSERT INTO groupparticipants
        ("userId", "muted", "groupchatId")
        VALUES
        (${participants[i]}, FALSE, ${groupchatId});
        `
      );
    }
    return "User has been added";
  } catch (error) {
    console.log(error);
    return error;
  }
}

// Mutes a groupchat's notifications for a user
async function muteChat(groupchatId, userId) {
  try {
    const mutedUser = await sequelize.query(
      `Update groupparticipants set muted=TRUE where \"groupchatId\" = ${groupchatId} AND  \"userId\" = ${userId};`,
      { type: sequelize.QueryTypes.UPDATE }
    );
    return `muted chat: ${groupchatId} for user ${userId}`;
  } catch (error) {
    return error;
  }
}

// Unmutes a groupchat's notifications for a user
async function unmuteChat(groupchatId, userId) {
  try {
    const unmutedUser = await sequelize.query(
      `Update groupparticipants set muted=FALSE where \"groupchatId\" = ${groupchatId} AND  \"userId\" = ${userId};`,
      { type: sequelize.QueryTypes.UPDATE }
    );
    return `unmuted chat: ${groupchatId} for user ${userId}`;
  } catch (error) {
    return error;
  }
}

// Checks which groupchats are muted for a user
async function checkChatMuted(userId, groupchatId) {
  try {
    const isMuted = await sequelize.query(
      `select muted from groupparticipants where "userId" = ${userId} AND "groupchatId" = ${groupchatId};`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return isMuted;
  } catch (error) {
    return error;
  }
}

module.exports = {
  addGroupchat: addGroupchat,
  getFriendsNotinChat: getFriendsNotinChat,
  getGroupchats: getGroupchats,
  getGroupParticipants: getGroupParticipants,
  addMessage: addMessage,
  getGroupchatMessages: getGroupchatMessages,
  removeUser: removeUser,
  addUser: addUser,
  editGroupchatName: editGroupchatName,
  getSingleGroupchat: getSingleGroupchat,
  muteChat: muteChat,
  unmuteChat: unmuteChat,
  checkChatMuted: checkChatMuted,
};
