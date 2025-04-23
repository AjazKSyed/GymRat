'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    


    await queryInterface.addColumn(
      "messages", "toBatchId", {
        type:Sequelize.INTEGER,
        allowNull:true 
      }
      
    )

    await queryInterface.addColumn(
      "messages", "toEventId", {
        type:Sequelize.INTEGER,
        allowNull:true 
      }
      
    )


  
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('groupparticipants');
  }
};