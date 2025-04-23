module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.renameColumn("BatchInterests", "batchId", "BatchGroupId")

      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.renameColumn("BatchInterests", "batchId", "BatchGroupId")
      ])
  }
};