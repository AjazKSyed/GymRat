"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("pod_pics", {
      fields: ["batchId"],
      type: "foreign key",
      name: "pod_pics_batch_foreign_key",
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
      "pod_pics",
      "pod_pics_batch_foreign_key"
    );
  },
};
