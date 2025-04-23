"use strict";
module.exports = (sequelize, DataTypes) => {
  const User_pic = sequelize.define("user_pic", {
    userId: DataTypes.INTEGER,
    imgUrl: DataTypes.TEXT,
    imgtype: {
      type: DataTypes.ENUM(
        "general0",
        "general1",
        "general2",
        "general3",
        "profile"
      ),
    },
    status: {
      type: DataTypes.ENUM("approved", "pending", "rejected"),
      defaultValue: "pending",
    },
  });
  User_pic.associate = function (models) {
    User_pic.belongsTo(models.user, { foreignKey: "userId" });
  };
  return User_pic;
};
