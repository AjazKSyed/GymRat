"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("user_pics", {
      fields: ["userId"],
      type: "foreign key",
      name: "user_pics_user_foreign_key",
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
      "user_pics",
      "user_pics_user_foreign_key"
    );
  }
};
