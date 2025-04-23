"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("groupparticipants", "groupchatId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("groupparticipants", "batchId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("groupparticipants", "eventId", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("groupparticipants", "status", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("groupparticipants");
  },
};
