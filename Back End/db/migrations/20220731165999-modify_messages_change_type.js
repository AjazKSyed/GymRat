module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('messages', 'body', {
              type: Sequelize.TEXT,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('messages', 'body', {
              type: Sequelize.STRING,
          })
      ])
  }
};