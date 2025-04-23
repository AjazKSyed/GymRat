module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.renameColumn("pod_pics", "batchId", "BatchGroupId")
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.renameColumn("pod_pics", "batchId", "BatchGroupId")
      ])
  }
};