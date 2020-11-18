'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    'users',
    {
      fullName: {
        type: DataTypes.STRING,
        notNull: true,
        notEmpty: true,
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
          len: {
            args: [5],
            msg: 'Password at least must be 6 characters',
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['male', 'female']],
        },
      },
      phone: {
        type: DataTypes.STRING,
        validate: {
          isNumeric: true,
        },
      },
      address: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        validate: {
          isIn: [['user', 'admin']],
        },
        defaultValue: 'user',
      },
      subscribe: DataTypes.BOOLEAN,
    },
    {
      hooks: {
        beforeCreate: async function (user) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );
  users.associate = function (models) {
    users.hasMany(models.transactions, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return users;
};
