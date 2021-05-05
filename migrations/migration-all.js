module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => queryInterface.addColumn(
    'users',
    'email',
    {
      type: Sequelize.STRING,
    },
    {
      transaction: t,
    },
  )),

  down: async (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => queryInterface.removeColumn('users', 'email', {
    transaction: t,
  })),
};
