"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_Status = sequelize.define("User_Statuss", {
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    body: DataTypes.STRING,
  });


  User_Status.associate = function (models) {
    User_Status.belongsTo(models.user, { foreignKey: "fromUserId" });
    User_Status.belongsTo(models.type_of_status, { foreignKey: "statusId" });
    User_Status.belongsTo(models.user, { foreignKey: "toUserId" });
  };


  return User_Status;
};
