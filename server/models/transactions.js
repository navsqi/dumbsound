'use strict';
module.exports = (sequelize, DataTypes) => {
  const transactions = sequelize.define(
    'transactions',
    {
      startDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      dueDate: {
        type: DataTypes.DATE,
        defaultValue: new Date(new Date().setDate(new Date().getDate() + 31)),
      },
      userId: DataTypes.NUMBER,
      attachment: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'pending',
      },
    },
    {}
  );
  transactions.associate = function (models) {
    transactions.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return transactions;
};
