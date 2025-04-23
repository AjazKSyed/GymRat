const models = require("../models");
const user = models.user;
const pics = models.user_pic;
const interests = models.interest;
const BatchGroup = models.BatchGroup;
const Event = models.Events;

const user_friends = models.user_friend;
const { literal, Op, query } = require("sequelize");
const bcrypt = require("bcrypt");
var normalizeEmail = require("normalize-email");
const { sequelize } = require("../models");
const { normalizeText } = require("normalize-text");

const saltRounds = 10;

async function saveToken(req) {
  const userId = req.params.userId;
  const pushToken = req.body.pushTokenKey;
  const existingUser = await user.findOne({
    where: {
      id: userId,
    },
  });

  const updatedUser = await user.update(
    {
      pushTokenKey: pushToken,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  return { updated: "updated" };
}

async function getCount() {
  const total = await sequelize.query(
    `select count(*) as "Total" from users;`,
    { type: sequelize.QueryTypes.SELECT }
  );
  return total;
}

async function getAllUsers() {
  const users = await user.findAll({
    order: [["createdAt", "DESC"]],
  });
  return users;
}
async function getUserByUserId(userId) {
  const userData = await user.findAll({
    where: {
      id: userId,
      status: "active",
    },
    include: [
      {
        model: pics,
      },
      {
        model: interests,
      },
      {
        model: user_friends,
      }
    ],
  });
  return userData;
}

async function getUsersByName(req) {
  const fullName = normalizeText(req.body.fullName);
  const userId = JSON.parse(req.body.userId);

  const friendIds = await sequelize.query(
    `select user_friends."friendUserId" from user_friends where user_friends."userId" = ${userId}
  AND user_friends.status = 'APPROVED'`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const pendIds = await sequelize.query(
    `select user_friends."friendUserId" from user_friends where user_friends."userId" = ${userId}
  AND user_friends.status = 'PENDING'`,
    { type: sequelize.QueryTypes.SELECT }
  );

  const blockedIds = await sequelize.query(
    `select user_status."toUserId" from user_status where user_status."fromUserId" = ${userId} AND user_status."statusId" = 2`,
    { type: sequelize.QueryTypes.SELECT }
  );
  let arr = [];
  let pendArr = [];
  let blockedArr = [];

  friendIds.forEach((ids) => {
    arr.push(ids.friendUserId);
  });
  pendIds.forEach((ids) => {
    pendArr.push(ids.friendUserId);
  });
  blockedIds.forEach((ids) => {
    blockedArr.push(ids.toUserId);
  });

  let users = await user.findAll({
    where: {
      status: "active",
      [Op.and]: [
        {
          fullName: { [Op.iLike]: sequelize.literal(`\'${fullName}%\'`) },
        },
        {
          id: {
            [Op.and]: [
              { [Op.ne]: userId },
              { [Op.notIn]: arr },
              { [Op.notIn]: pendArr },
              { [Op.notIn]: blockedArr },
            ],
          },
        },
      ],
    },
    include: [
      {
        model: pics,
      },
      {
        model: interests,
      },
    ],
  });

  return users;
}

// updating a user
async function changePassword(req) {
  const id = req.params.userId;
  const oldPass = req.body.oldPassword;
  const newPass = req.body.newPassword;

  const existingUser = await user.findOne({
    where: {
      id: id,
    },
  });
  let correctPassword = await bcrypt.compare(oldPass, existingUser.password);

  if (correctPassword) {
    // Random Salt for hashed password
    let salt = await bcrypt.genSalt(saltRounds);
    // generates Hashed Password
    let hashPass = await bcrypt.hash(newPass, salt);
    const updatedUser = await user.update(
      {
        password: hashPass,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return 1;
  }
  return 0;
}

async function resetPass(req) {
  const id = req.params.userId;
  const newPass = req.body.newPassword;

  const existingUser = await user.findOne({
    where: {
      id: id,
    },
  });

  // Random Salt for hashed password
  let salt = await bcrypt.genSalt(saltRounds);
  // generates Hashed Password
  let hashPass = await bcrypt.hash(newPass, salt);
  const updatedUser = await user.update(
    {
      password: hashPass,
    },
    {
      where: {
        id: id,
      },
    }
  );
  return { updated: "updated" };
}

// updating a user
async function editUser(req) {
  const id = req.params.userId;

  const updatedUser = await user.update(req.body, {
    where: {
      id: id,
    },
  });
  return updatedUser;
}

// left/right/outer join to grab people who are not in friendss
async function getAllUserByLocation(
  userId,
  userLat,
  userLong,
  prefDist,
  offset
) {
  // LIMIT
  const userMatched = await sequelize.query(
    `SELECT * FROM(
    SELECT *,( ( ( acos(sin((${userLat}*pi()/180)) * sin((latitude*pi()/180))+cos((${userLat}*pi()/180)) * cos((latitude*pi()/180)) * cos(((${userLong} - longitude)*pi()/180))
) )*180/pi() )*60*1.1515*1.609344 ) as nearby FROM users where users.status = 'active' ) t
WHERE  nearby <= ${prefDist} AND id != ${userId} AND id NOT IN (SELECT "toUserId" FROM user_status WHERE "fromUserId" = ${userId} AND user_status."statusId" = 2) AND id NOT IN (SELECT "friendUserId" FROM user_friends WHERE "userId" = ${userId})  order BY nearby ASC  OFFSET ${offset}`,
    { nest: true, type: sequelize.QueryTypes.SELECT }
  );
  const userMap = userMatched.map(function name(usr, i) {
    return usr.id;
  });

  const finUsers = await user.findAll({
    where: {
      id: {
        [Op.in]: userMap,
      },
    },
    order: [["id"]],
    // limit: 10,
    // offset: offset,
    include: [
      {
        model: pics,
      },
      {
        model: interests,
      },
    ],
  });

  var finArr = [];
  for (let i = 0; i < userMap.length; i++) {
    let index = 0;
    for (let a = 0; a < userMap.length; a++) {
      if (userMatched[a].id === finUsers[i].id) {
        index = a;
      }
    }
    finArr.push(finUsers[index]);
  }
  const sortedUsers = finArr.map(function name(usr, i) {
    return usr;
  });

  return sortedUsers;
}

async function deleteUser(userId) {
  const updatedUser = await user.destroy({
    where: {
      id: userId,
    },
  });
  return "deleted";
}

module.exports = {
  getCount: getCount,
  getAllUsers: getAllUsers,
  getUserByUserId: getUserByUserId,
  editUser: editUser,
  deleteUser: deleteUser,
  getAllUserByLocation: getAllUserByLocation,
  getUsersByName: getUsersByName,
  changePassword: changePassword,
  resetPass: resetPass,
  saveToken: saveToken,
};
