"use strict";
module.exports = (sequelize, DataTypes) => {
  const Groupchat = sequelize.define("groupchat", {
    groupname: DataTypes.STRING
  });


  return Groupchat;
};
