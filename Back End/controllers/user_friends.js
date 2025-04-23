const models = require("../models");
const user_friend = models.user_friend;
const user = models.user;
const friend = models.friend;
const user_pic = models.user_pics;
const user_interest = models.user_interests;

const { Op, QueryTypes } = require("sequelize");

async function getAllUserFriends(userId) {
  const user_friends = await user_friend.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          userId: {
            [Op.eq]: userId,
          },
        },
        {
          status: {
            [Op.eq]: "APPROVED",
          },
        },
      ],
    },
    include: { all: true,  },
  });

  /*
  const user = await models.sequelize.query(
    "Select * from user_friends where userId = " + userId + ";"
  );*/
  return user_friends;
}
// get all of users friend requests (denoted that the status is pending)
async function getAllRequests(userId) {
  const user_requests = await user_friend.findAll({
    order: [["createdAt", "DESC"]],
    where: {
      [Op.and]: [
        {
          userId: {
            [Op.eq]: userId,
          },
        },
        {
          status: {
            [Op.eq]: "PENDING",
          },
        },
      ],
    },
  });
  return user_requests;
}

// fix it so that it just has the sentId, userId, friend, status
async function addFriendRequest(postData) {
  const existingUserFriends = await user_friend.findOne({
    where: {
      userId: postData.userId,
      friendUserId: postData.friendUserId,
    },
  });

  if (existingUserFriends !== null) {
    return existingUserFriends;
  }

  const userFriendOneData = await user_friend.create({
    sentId: postData.userId,
    gotId: postData.friendUserId,

    userId: postData.userId,
    friendUserId: postData.friendUserId,

    status: postData.status,
  });
  const userFriendTwoData = await user_friend.create({
    sentId: postData.userId,
    gotId: postData.friendUserId,

    userId: postData.friendUserId,
    friendUserId: postData.userId,

    status: postData.status,
  });

  return userFriendOneData;
}

// checks request status:
// only called if clicked accept,  update it to approved, which makes them a friend
async function updateRequest(req) {
  const id = req.params.userId;
  const friendId = req.params.friendUserId;
  const existingRequest1 = user_friend.update(req.body, {
    where: {
      userId: id,
      friendUserId: friendId,
    },
  });
  user_friend.update(req.body, {
    where: {
      userId: friendId,
      friendUserId: id,
    },
  });
  return existingRequest1;
}
// only for the user who requested it
async function removeUserFriends(userId, friendUserId) {
  // deleting user with id given
  const deleted_friend = user_friend.destroy({
    where: {
      userId: userId,
      friendUserId: friendUserId,
    },
  });

  const deleted_user = user_friend.destroy({
    where: {
      userId: friendUserId,
      friendUserId: userId,
    },
  });
  return deleted_friend;
}

module.exports = {
  getAllUserFriends: getAllUserFriends,
  getAllRequests: getAllRequests,
  addFriendRequest: addFriendRequest,
  updateRequest: updateRequest,
  removeUserFriends: removeUserFriends,
};
