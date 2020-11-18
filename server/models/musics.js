'use strict';
module.exports = (sequelize, DataTypes) => {
  const musics = sequelize.define(
    'musics',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
        },
      },
      attachment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      artistId: {
        type: DataTypes.NUMBER,
      },
    },
    {}
  );
  musics.associate = function (models) {
    musics.belongsTo(models.artists, {
      foreignKey: 'artistId',
      as: 'artist',
    });
  };
  return musics;
};
