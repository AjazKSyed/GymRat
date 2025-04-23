"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("messages", {
      fields: ["toEventId"],
      type: "foreign key",
      name: "messages_toEventId_foreign_key",
      references: {
        table: "Events",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "messages",
      "messages_toEventId_foreign_key"
    );
  },
};
