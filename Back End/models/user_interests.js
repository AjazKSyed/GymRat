"use strict";
const user = require("./users");
const interest = require("./interests");

module.exports = (sequelize, DataTypes) => {
  const User_interest = sequelize.define("user_interest", {
    userId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER,
  });

  User_interest.associate = function (models) {
    User_interest.belongsTo(models.user, { foreignKey: "userId" });
    User_interest.belongsTo(models.interest, { foreignKey: "interestId" });
  };
  return User_interest;
};
