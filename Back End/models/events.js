"use strict";
module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    batchId: DataTypes.INTEGER,
    bio: DataTypes.TEXT,
    name: DataTypes.TEXT,
    address: DataTypes.TEXT,
    date: DataTypes.DATE,
  });

  Events.associate = function (models) {
    Events.hasMany(models.pod_pics);
  };


  return Events;
};
// update
