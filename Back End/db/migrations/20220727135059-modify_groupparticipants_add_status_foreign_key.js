"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("groupparticipants", {
      fields: ["status"],
      type: "foreign key",
      name: "groupparticipants_status_foreign_key",
      references: {
        table: "type_of_status",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "groupparticipants",
      "groupparticipants_status_foreign_key"
    );
  },
};
