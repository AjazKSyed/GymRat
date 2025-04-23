"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("messages", {
      fields: ["toBatchId"],
      type: "foreign key",
      name: "messages_toBatchId_foreign_key",
      references: {
        table: "BatchGroups",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "messages",
      "messages_toBatchId_foreign_key"
    );
  },
};
