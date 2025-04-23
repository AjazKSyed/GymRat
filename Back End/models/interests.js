"use strict";
module.exports = (sequelize, DataTypes) => {
  const Interest = sequelize.define("interest", {
    interestName: DataTypes.STRING
  });
  Interest.associate = function(models) {
    Interest.belongsToMany(models.user, { through: "user_interests" });
    Interest.belongsToMany(models.BatchGroup, { through: "BatchInterests" });

  };
  return Interest;
};
