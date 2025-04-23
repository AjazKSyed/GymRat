"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      fullName: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },

      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      distance: {
        type: Sequelize.INTEGER
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other", "prefer_not_to_say")
      },
      gym: {
        type: Sequelize.STRING
      },
      instagram: {
        type: Sequelize.STRING
      },
      spotify: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.STRING
      },
      tiktok: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'flagged')
      },
      questionOne:{
        type:Sequelize.INTEGER

      },
      answerOne:{
        type:Sequelize.STRING
      },

      questionTwo:{
        type:Sequelize.INTEGER
      },
      answerTwo:{
        type:Sequelize.STRING
      },

      questionThree:{
        type:Sequelize.INTEGER
      },
      answerThree:{
        type:Sequelize.STRING
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
    return queryInterface.dropTable("users");
  }
};
