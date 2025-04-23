"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_friend = sequelize.define("user_friend", {
    userId: DataTypes.INTEGER,
    friendUserId: DataTypes.INTEGER,
    sentId: DataTypes.INTEGER,
    gotId: DataTypes.INTEGER,
    status: DataTypes.ENUM("APPROVED", "PENDING", "DENIED"),
  });
  User_friend.associate = function (models) {
    User_friend.belongsTo(models.user, { foreignKey: "friendUserId" });
  };

  return User_friend;
};
