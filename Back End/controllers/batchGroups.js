const { literal, Op, query, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const models = require("../models");
const BatchGroup = models.BatchGroup;
const Event = models.Events;
const GroupParticipants = models.groupparticipants;
const interests = models.interest;
const { normalizeText } = require("normalize-text");
const Message = models.messages;
const User = models.user;
const pod_pic = models.pod_pics;

// gets all batches user has joined
async function getJoinedBatches(userId) {
  const joined = await GroupParticipants.findAll({
    attributes: ["batchId"],
    where: {
      userId: userId,
      batchId: {
        [Op.ne]: null,
      },
    },
  });
  let joinedArr = [];

  joined.forEach((ids) => {
    joinedArr.push(ids.batchId);
  });

  const joinedBatches = await BatchGroup.findAll({
    where: {
      id: {
        [Op.in]: joinedArr,
      },
    },
    include: [
      {
        model: User,
      },
      {
        model:interests,
      },
      {
        model: pod_pic,
      }
    ],  });
  return joinedBatches;
}

// gets all batches user owns
async function getMyBatches(userId) {
  const myBatches = await BatchGroup.findAll({
    where: {
      ownerId: userId,
    },
    include: [
      {
        model: User,
      },
      {
        model:interests,
      },
      {
        model: pod_pic,
      }
    ],
  });
  return myBatches;
}

// finds batch matching name (not owned by user)
async function searchBatch(name, userId) {
  const batchName = normalizeText(name);
  const ownerId = JSON.parse(userId);

  const batches = await BatchGroup.findAll({
    where: {
      [Op.and]: [
        {
          name: { [Op.iLike]: sequelize.literal(`\'${batchName}%\'`) },
        },
        {
          ownerId: {
            [Op.ne]: ownerId,
          },
        },
      ],
    },
    include: [
      {
        model: User,
      },
      {
        model:interests,
      },
      {
        model: pod_pic,
      }
    ],
  });

  return batches;
}

/*
  parameters
      id
      userLong
      userLat
    return batch groups that are a certain dist away
*/
async function getClosestBatches(userId, long, lat, travelDistance) {
  const batchMatched = await sequelize.query(
    `SELECT
    *
  FROM
    (
      SELECT
        *,
        (
          (
            (
              acos(
                sin(
                  (
                    ${lat} * pi()/ 180
                  )
                ) * sin(
                  (
                    lat * pi()/ 180
                  )
                )+ cos(
                  (
                    ${lat} * pi()/ 180
                  )
                ) * cos(
                  (
                    lat * pi()/ 180
                  )
                ) * cos(
                  (
                    (${long} - long)* pi()/ 180
                  )
                )
              )
            )* 180 / pi()
          )* 60 * 1.1515 * 1.609344
        ) as nearby
      FROM
        "BatchGroups"
    ) t
  WHERE
    nearby <= ${travelDistance}
    AND "ownerId" != ${userId}
  order BY
    nearby ASC;
  `,
    { type: sequelize.QueryTypes.SELECT }
  );
  const batchMap = batchMatched.map(function name(batch, i) {
    return batch.id;
  });
  console.log(batchMap);

  const finalBatch = await BatchGroup.findAll({
    where: {
      id: {
        [Op.in]: batchMap,
      },
    },
    include: [
      {
        model: User,
      },
      {
        model:interests,
      },
      {
        model: pod_pic,
      }
    ],
    order: [["id"]],
  });

  var finArr = [];
  for (let i = 0; i < batchMap.length; i++) {
    let index = 0;
    for (let a = 0; a < batchMap.length; a++) {
      if (batchMatched[a].batchId === finalBatch[i].batchId) {
        index = a;
      }
    }
    finArr.push(finalBatch[index]);
  }
  const sortedBatches = finArr.map(function name(batch, i) {
    return batch;
  });

  return sortedBatches;
}

 async function createBatch(postData) {
  try {
    const addBatchId = await sequelize.query(
      `
    INSERT INTO \"BatchGroups\"
    ("name", "bio", "ownerId", "long", "lat", "state", "city")
    VALUES
    ('${postData.name}', '${postData.bio}', ${postData.ownerId}, ${postData.long}, ${postData.lat}, '${postData.state}', '${postData.city}')
    RETURNING "id";
    `
    );

    const batchId = addBatchId[0][0]["id"];

    console.log(addBatchId, batchId);

    await sequelize.query(
      `
    INSERT INTO groupparticipants
    ("userId", "muted", "batchId")
    VALUES
    (${postData.ownerId}, FALSE, ${batchId} );
    `
    );
    return "batch has been created ", batchId;
  } catch (error) {
    console.log(error);
  }
}

// delete Batch occurence and all messages,events,batch  with matching batchId
async function deleteBatch(batchId) {
  const getAssoicatedEventId = await Event.findAll({
    attributes: ["id"],
    where: {
      batchId: batchId,
    },
  });
  console.log(getAssoicatedEventId);

  let eventsAssociated = [];
  getAssoicatedEventId.forEach((ids) => {
    eventsAssociated.push(ids.eventId);
  });

  // delete all messages associated with an eventId
  const messagesDeleted = await Message.destroy({
    where: {
      toEventId: {
        [Op.in]: eventsAssociated,
      },
    },
  });

  const eventsDeleted = await Event.destroy({
    where: {
      batchId: batchId,
    },
  });
  const batchDeleted = await BatchGroup.destroy({
    where: {
      id: batchId,
    },
  });
  return `Batch ${batchId} deleted`;
}

// update Batch infoo
async function updateBatch(batchId, userId, postData) {
  try {
    const updatedBatch = await BatchGroup.update(postData, {
      where: {
        id: batchId,
        ownerId: userId,
      },
    });
    return `Batch ${batchId} updated`;
  } catch (error) {
    console.log(error);
  }

  /*
   nameField = postData.name;
   // bioField = postData.bio;
   // longField = postData.long;
   // latField = postData.lat;
   // stateField = postData.state;
   // cityField = postData.city;
   // try {
   //   const updateBatchCall = await sequelize.query(
   / /     `
   //     UPDATE \"BatchGroups\"
   //     Set

   //     \"name\" = ${nameField},
   //     \"bio\" = ${bioField},
   //     \"ownerId\" = ${ownerId},
   //     \"long\" = ${longField},
   //     \"lat\" = ${latField},
   //     \"state\" = ${stateField},
   //     \"city\" = ${cityField}

   //     WHERE
   //      \"batchId\" = ${batchId},

   //      `,
   //     { type: sequelize.QueryTypes.SELECT }
   //   );

   //   return "Batch has been updated";
   // } catch (error) {
   //   return error;
   // }
   */
}

// add user to batch
async function joinBatch(batchId, userId) {
  await sequelize.query(
    `
    INSERT INTO groupparticipants
    ("userId", "muted", "batchId")
    VALUES
    (${userId}, FALSE, ${batchId} );
    `
  );
  return "user added to batch";
}

/*
    // gets podtype id rows  for userId
    // async function getAll(userId, podtype) {
    //   assoicatedtables = {
    //     batchId: "BatchGroups",
    //     eventId: "Events",
    //     groupchatId: "groupchat",
    //   };

    //   assoicatedtable = assoicatedtables[podtype];

    //   // podType = batchId, eventId, groupchatId

    //   try {
    //     //  gets podtype info assoicated with user
    //     const getAll = await sequelize.query(
    //       `
    //       SELECT t.* FROM
    //       groupparticipants,${assoicatedtable} as t where

    //       groupparticipants.\"${podtype}\" !=""
    //       and
    //       groupparticipants.\"userId\" = ${userId}
    //       and
    //       t.\"${podtype}\" = groupparticipants.\"${podtype}\"



    //       ;
    //        `,
    //       { type: sequelize.QueryTypes.SELECT }
    //     );

    //     return getAll;
    //   } catch (error) {
    //     return error;
    //   }
    }
*/

// remove user from  Batch
async function leaveBatchUser(batchId, userId) {
  try {
    const deleteBatchUser = await sequelize.query(
      `
      DELETE FROM  \"groupparticipants\"
      WHERE
      \"batchId\" = ${batchId}
      and
      \"userId\" = ${userId}

      ;
       `,
      { type: sequelize.QueryTypes.DELETE }
    );

    return "User has been deleted from Batch";
  } catch (error) {
    return error;
  }
}

// gets Batch info
async function getBatchInfo(batchId) {
  const batchInfo = await BatchGroup.findAll({
    where: {
      id: batchId,
    },
    include: [
      {
        model: User,
      },
      {
        model:interests,
      },
      {
        model: pod_pic,
      }
    ],
  });
  // try {
  //   const batchInfo = await sequelize.query(
  //     `
  //     SELECT * FROM  \"BatchGroups\"
  //     WHERE
  //     \"batchId\" = ${batchId},
  //     ;
  //      `,
  //     { type: sequelize.QueryTypes.SELECT }
  //   );

  //   return batchInfo;
  // } catch (error) {
  //   return error;
  // }
  return batchInfo;
}

// kicks members out of batch
async function kickMemberFromBatch(batchId, userId, ownerId) {
  try {
    const verify = await sequelize.query(
      `
        Select id from "BatchGroups" where "ownerId" = ${ownerId} AND id = ${batchId}
      `
    );
    if (verify[0].length > 0) {
      let kickedUser = await sequelize.query(
        `
        DELETE FROM  \"groupparticipants\"
        WHERE
        \"batchId\" = ${batchId}
        and
        \"userId\" = ${userId}
        ;
         `,
        { type: sequelize.QueryTypes.DELETE }
      );
      return "User has been kicked from Batch";
    } else {
      return "Not Owner";
    }
  } catch (error) {
    return error;
  }
}

// gets all members in batch
async function getMembers(batchId, userId) {
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
    `select users."firstName", users."lastName", users.id from users, groupparticipants where groupparticipants."batchId" = ${batchId}
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

// get all the friends not in batch
async function getFriendsNotBatch(batchId, userId) {
  const friends = await sequelize.query(
    `select user_friends."friendUserId", users."fullName" from user_friends,users where user_friends."userId" = ${userId}
  AND user_friends."friendUserId" NOT IN (select groupparticipants."userId" from groupparticipants where groupparticipants."batchId" = ${batchId} AND groupparticipants."userId" != ${userId}) AND users.id = user_friends."friendUserId" AND user_friends.status = 'APPROVED'`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return friends;
}

///////////////////////////////////////////// ASK SASANTH
// adds all users to Batch
async function inviteUserToBatch(batchId, postData) {
  const participants = JSON.parse(postData.participants);
  for (let i = 0; i < participants.length; i++) {
    let found = await sequelize.query(
      `
        select count("batchId") from groupparticipants where groupparticipants."userId" = ${participants[i]} AND groupparticipants."batchId" = ${batchId};
        `,    { type: sequelize.QueryTypes.SELECT }
        )
    if (found[0].count >= 1) {
      return found;
    }
    await sequelize.query(
      `
      INSERT INTO groupparticipants
      ("userId", "muted", "batchId")
      VALUES
      (${participants[i]}, FALSE, ${batchId} );`

    );
  }
  return "Users have been added";
}

// Mutes a batch chats's notifications for a user
async function muteBatch(batchId, userId) {
  const muted = await GroupParticipants.update(
    {
      muted: true,
    },
    {
      where: {
        batchId: batchId,
        userId: userId,
      },
    }
  );

  return `muted batch ${batchId}'s chat for user ${userId}`;
}

// Unmutes a batch chats's notifications for a user
async function unmuteBatch(batchId, userId) {
  const unmuted = await GroupParticipants.update(
    {
      muted: false,
    },
    {
      where: {
        batchId: batchId,
        userId: userId,
      },
    }
  );

  return `unmuted batch ${batchId}'s chat for user ${userId}`;
}

// Checks which batch are muted for a user
async function checkBatchMuted(userId, batchId) {
  const isMuted = await GroupParticipants.findAll({
    attributes: ["muted"],
    where: {
      batchId: batchId,
      userId: userId,
    },
  });
  return isMuted;
}

// Creates a message in a batch
async function addMessage(postData) {
  var id = 0;
  var batchId = 0;
  const m = await Message.create({
    fromuserId: postData.fromuserId,
    toBatchId: postData.toBatchId,
    body: postData.body,
    request: postData.request,
  }).then(function (x) {
    id = x.id;
    batchId = x.toBatchId;
  });

  await sequelize.query(`
    update "BatchGroups" set "updatedAt" = messages."createdAt" from messages where messages.id = ${id} and "BatchGroups"."id" = ${batchId};
  `);

  return "Message Added";
}
// Returns all messages for a groupchat
async function getBatchMessages(batchId) {
  try {
    const data = await sequelize.query(
      `select users."fullName",users.id, messages.body,messages."createdAt" from users,messages where messages."toBatchId" = ${batchId} AND messages."fromuserId" = users.id order by messages."createdAt" desc;`,
      { type: sequelize.QueryTypes.SELECT }
    );
    return data;
  } catch (error) {
    return error;
  }
}

module.exports = {
  createBatch: createBatch,
  deleteBatch: deleteBatch,
  updateBatch: updateBatch,
  joinBatch: joinBatch,
  // getAll: getAll,
  leaveBatchUser: leaveBatchUser,
  getBatchInfo: getBatchInfo,
  getClosestBatches: getClosestBatches,
  searchBatch: searchBatch,
  getJoinedBatches: getJoinedBatches,
  getMyBatches: getMyBatches,
  getMembers: getMembers,
  getFriendsNotBatch: getFriendsNotBatch,
  inviteUserToBatch: inviteUserToBatch,
  kickMemberFromBatch: kickMemberFromBatch,
  getBatchMessages: getBatchMessages,
  addMessage: addMessage,
  checkBatchMuted: checkBatchMuted,
  unmuteBatch: unmuteBatch,
  muteBatch: muteBatch,
};
