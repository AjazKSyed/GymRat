"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Events", {
      fields: ["batchId"],
      type: "foreign key",
      name: "Events_batchId_foreign_key",
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
      "Events",
      "Events_batchId_foreign_key"
    );
  },
};
