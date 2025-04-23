"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("user_status", {
      fields: ["statusId"],
      type: "foreign key",
      name: "statusId_foreign_key_user_status",
      references: {
        table: "type_of_status",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
        "statusId_foreign_key_user_status"
    );
  }
};
