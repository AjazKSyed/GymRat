"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("groupparticipants", {
      fields: ["batchId"],
      type: "foreign key",
      name: "groupparticipants_batchId_foreign_key",
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
      "groupparticipants",
      "groupparticipants_batchId_foreign_key"
    );
  },
};
