"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("notifications", {
      fields: ["userId"],
      type: "foreign key",
      name: "notifications_user_foreign_key",
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
      "notifications",
      "notifications_user_foreign_key"
    );
  }
};
