'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('artists', [
      {
        name: 'Bon Jovi',
        old: 42,
        type: 'Band',
        startCareer: '1983',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Aimer',
        old: 25,
        type: 'Solo',
        startCareer: '2002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Dewa 19',
        old: 21,
        type: 'Band',
        startCareer: '1990',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('artists');
  },
};
