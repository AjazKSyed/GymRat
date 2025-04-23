"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("BatchInterests", {
      fields: ["batchId"],
      type: "foreign key",
      name: "BatchInterests_batchId_foreign_key",
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
      "BatchInterests",
      "BatchInterests_batchId_foreign_key"
    );
  },
};
