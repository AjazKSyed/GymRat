"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("groupparticipants", {


      groupchatId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },


      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("groupparticipants");
  }
};
