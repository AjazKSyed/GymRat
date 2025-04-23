"use strict";
module.exports = (sequelize, DataTypes) => {
  const Pod_pic = sequelize.define("pod_pics", {
    BatchGroupId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
    groupchatId: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT,
    status: {
      type: DataTypes.ENUM("approved", "pending", "rejected"),
      defaultValue: "pending",
    },
  });

  Pod_pic.associate = function (models) {
    Pod_pic.belongsTo(models.BatchGroup, {
      foreignKey: "BatchGroupId",
    });

    Pod_pic.belongsTo(models.Events, {
      foreignKey: "EventId",
    });
    Pod_pic.belongsTo(models.groupchat, {
      foreignKey: "groupchatId",
    });
  };
  return Pod_pic;
};
