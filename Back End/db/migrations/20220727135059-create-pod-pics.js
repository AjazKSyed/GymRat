"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("pod_pics", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      batchId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      groupchatId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      eventId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      imgUrl: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('approved', 'pending', 'rejected'),
        defaultValue: 'pending'
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("pod_pics");
  }
};
