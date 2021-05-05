'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('users', 'image_url', {
      type: Sequelize.STRING,
    }),

  down: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('users', 'image_url')

};
