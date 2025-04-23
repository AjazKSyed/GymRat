"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("pod_pics", {
      fields: ["groupchatId"],
      type: "foreign key",
      name: "pod_pics_groupchatId_foreign_key",
      references: {
        table: "groupchat",
        field: "groupchatId",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      "pod_pics",
      "pod_pics_groupchatId_foreign_key"
    );
  },
};
