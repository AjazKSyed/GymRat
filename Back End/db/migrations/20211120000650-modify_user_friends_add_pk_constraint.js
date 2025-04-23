"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("user_friends", {
      fields: ["friendUserId"],
      type: "foreign key",
      name: "user_friend_friend_foreign_key",
      references: {
        table: "users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "user_friends",
      "user_friend_friend_foreign_key"
    );
  }
};
