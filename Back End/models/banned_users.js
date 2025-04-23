"use strict";
module.exports = (sequelize, DataTypes) => {
  const banned_user = sequelize.define("banned_user", {
    email: DataTypes.STRING,
  });

  return banned_user;
};