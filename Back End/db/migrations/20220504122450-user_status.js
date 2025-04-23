"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user_status", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fromUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
   
      },
      toUserId: {
        allowNull: false,  
        type: Sequelize.INTEGER,
   
      },  
      statusId: {
        type: Sequelize.INTEGER,
        allowNull: false
   
      },
      body:{
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
    return queryInterface.dropTable("user_status");
  }
};