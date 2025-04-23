"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("BatchInterests", {
      fields: ["interestId"],
      type: "foreign key",
      name: "BatchInterests_interestId_foreign_key",
      references: {
        table: "interests",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "BatchInterests",
      "BatchInterests_interestId_foreign_key"
    );
  },
};
