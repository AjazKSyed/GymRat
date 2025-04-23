const models = require("../models");
const banned_user = models.banned_user;
const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const bcrypt = require("bcrypt");
const users = models.user;

// Bans user
async function banUser(req) {
  let bannedId = req.params.userId;
  const existingUser = await users.findOne({
    where: {
      id: bannedId,
    },
  });

  const bannedAccount = await banned_user.create({
    email: existingUser.email,
  });
  const deleteUser = await users.destroy({
    where: {
      id: bannedId,
    },
  });
  return bannedAccount;
}

// Returns banned users
async function getAllBannedUsers() {
  const allUsers = await banned_user.findAll({});
  return allUsers;
}

module.exports = {
  banUser: banUser,
  getAllBannedUsers: getAllBannedUsers,
};
