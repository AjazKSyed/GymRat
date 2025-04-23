"use strict";


module.exports = (sequelize, DataTypes) => {
  const Batchinterest = sequelize.define("BatchInterests", {
    BatchGroupId: DataTypes.INTEGER,
    interestId: DataTypes.INTEGER,
  });

  Batchinterest.associate = function (models) {
    Batchinterest.belongsTo(models.BatchGroup, { foreignKey: "BatchGroupId" });
    Batchinterest.belongsTo(models.interest, { foreignKey: "interestId" });
  };
  return Batchinterest;
};
