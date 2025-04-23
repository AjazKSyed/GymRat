"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("groupparticipants", {
      fields: ["eventId"],
      type: "foreign key",
      name: "groupparticipants_eventId_foreign_key",
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
      "groupparticipants",
      "groupparticipants_eventId_foreign_key"
    );
  },
};
