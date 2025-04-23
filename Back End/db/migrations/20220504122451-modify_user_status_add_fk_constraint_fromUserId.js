"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("user_status", {
      fields: ["fromUserId"],
      type: "foreign key",
      name: "fromUserId_foreign_key_user_status",
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
        "fromUserId_foreign_key_user_status"
    );
  }
};
