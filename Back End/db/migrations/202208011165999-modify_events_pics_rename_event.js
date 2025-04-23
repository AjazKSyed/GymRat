module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.renameColumn("pod_pics", "eventId", "EventId")
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.renameColumn("pod_pics", "eventId", "EventId")
      ])
  }
};