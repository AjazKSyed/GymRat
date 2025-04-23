"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("pod_pics", {
      fields: ["eventId"],
      type: "foreign key",
      name: "pod_pics_event_foreign_key",
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
      "pod_pics",
      "pod_pics_event_foreign_key"
    );
  },
};
