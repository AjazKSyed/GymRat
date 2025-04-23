"use strict";
module.exports = (sequelize, DataTypes) => {
  const notification = sequelize.define("notification", {
    payload: DataTypes.STRING,
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    fromId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
  });
  notification.associate = function (models) {
    notification.belongsTo(models.user, { foreignKey: "userId" });
  };

  return notification;
};

/// change notifications so that the we include eventId and batchId