"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("BatchGroups", {
      fields: ["ownerId"],
      type: "foreign key",
      name: "BatchGroups_ownerId_foreign_key",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "BatchGroups",
      "BatchGroups_ownerId_foreign_key"
    );
  },
};
