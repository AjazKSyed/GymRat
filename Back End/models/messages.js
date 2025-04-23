"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("messages", {
    request: DataTypes.STRING,
    body: DataTypes.TEXT,
    fromuserId: DataTypes.INTEGER,
    toGroupchatId: DataTypes.INTEGER,
    toBatchId: DataTypes.INTEGER,
    toEventId: DataTypes.INTEGER,
  });

  Message.associate = function (models) {
    Message.belongsTo(models.user, { foreignKey: "fromuserId" });
    Message.belongsTo(models.groupchat, { foreignKey: "toGroupchatId" });
    Message.belongsTo(models.BatchGroup, { foreignKey: "toBatchId" });
    Message.belongsTo(models.Events, { foreignKey: "toEventId" });
  };

  return Message;
};
