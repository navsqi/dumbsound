'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        fullName: 'Violet Evergarden',
        email: 'violet@gmail.com',
        password: '$2a$10$fXCr8aSC7FPLgRDjrAzk8OIULErNKu39JlNwiCte7osqx7DHJDnWK',
        gender: 'female',
        phone: '083896831233',
        address: 'Jln. Marvel Universe, RT.21 RW.69',
        subscribe: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Lucius Artorius',
        email: 'lucius@gmail.com',
        password: '$2a$10$AXv22mTySpoHpgoEvd4em.3RyT9TEXJ5by73c7XgY7UUPTAkJvAwe',
        gender: 'male',
        phone: '083896831232',
        address: 'Jln. Marvel Universe, RT.30 RW.66',
        subscribe: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: 'Super Admin',
        email: 'admin@dumbsound.com',
        password: '$2a$10$AXv22mTySpoHpgoEvd4em.3RyT9TEXJ5by73c7XgY7UUPTAkJvAwe',
        gender: 'male',
        phone: '083896831231',
        address: 'Jln. Marvel Universe, RT.30 RW.80',
        subscribe: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
