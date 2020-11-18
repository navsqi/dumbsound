'use strict';
module.exports = (sequelize, DataTypes) => {
  const artists = sequelize.define(
    'artists',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      old: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      startCareer: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true,
          notEmpty: true,
        },
      },
    },
    {}
  );
  artists.associate = function (models) {
    artists.hasMany(models.musics, {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return artists;
};
