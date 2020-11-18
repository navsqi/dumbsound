'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('transactions', [
      {
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        userId: 1,
        attachment: 'transaction-1592898717845.jpeg',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        userId: 2,
        attachment: 'transaction-1592898717845.jpeg',
        status: 'cancel',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        startDate: new Date(),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
        userId: 3,
        attachment: 'transaction-1592898717845.jpeg',
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('transactions', null, {});
  },
};
