"use strict";
module.exports = (sequelize, DataTypes) => {
  const groupParticipants = sequelize.define("groupparticipants", {
    userId: DataTypes.INTEGER,
    groupchatId: DataTypes.INTEGER,
    batchId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    muted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
  groupParticipants.associate = function (models) {

    groupParticipants.belongsTo(models.BatchGroup, {
      foreignKey: "batchId",
    });

    groupParticipants.belongsTo(models.Events, {
      foreignKey: "eventId",
    });
    groupParticipants.belongsTo(models.groupchat, {
      foreignKey: "groupchatId",
    });
    groupParticipants.belongsTo(models.type_of_status, {
      foreignKey: "status"
    });
    groupParticipants.belongsTo(models.user, {
      foreignKey: "userId"
    });

  };

  return groupParticipants;
};
