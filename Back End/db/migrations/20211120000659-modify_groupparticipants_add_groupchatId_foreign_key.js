"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("groupparticipants", {
      fields: ["groupchatId"],
      type: "foreign key",
      name: "groupparticipants_groupchatId_foreign_key",
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
      "groupparticipants",
      "groupparticipants_groupchatId_foreign_key"
    );
  },
};
