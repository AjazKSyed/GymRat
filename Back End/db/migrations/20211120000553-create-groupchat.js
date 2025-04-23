"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("groupchat", {

        groupchatId: {
        allowNull: false,
        primaryKey:true ,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },

      
      groupname: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable("groupchat");
  }
};
