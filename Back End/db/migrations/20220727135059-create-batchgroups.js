"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("BatchGroups", {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      bio: {
        allowNull: true,
        type: Sequelize.TEXT
      },

      ownerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("BatchGroups");
  },
};
