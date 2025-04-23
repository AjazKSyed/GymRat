"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Events", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      batchId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.TEXT,
      },

      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      long: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },

      lat: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      state: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      date: {
        allowNull: true,
        type: Sequelize.DATE,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)"),
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Events");
  },
};
