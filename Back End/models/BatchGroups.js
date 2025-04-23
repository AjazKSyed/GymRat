"use strict";

module.exports = (sequelize, DataTypes) => {
  const BatchGroup = sequelize.define("BatchGroup", {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    ownerId: DataTypes.INTEGER,
    long: DataTypes.INTEGER,
    lat: DataTypes.INTEGER,
    state: DataTypes.STRING,
    city: DataTypes.STRING
    });

  BatchGroup.associate = function (models) {
    BatchGroup.belongsTo(models.user, { foreignKey: "ownerId" });
    BatchGroup.belongsToMany(models.interest, { through: "BatchInterests" });
    BatchGroup.hasMany(models.pod_pics);
  };

  return BatchGroup;
};
// updated
