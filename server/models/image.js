'use strict';
module.exports = (sequelize, DataTypes) => {
  const image = sequelize.define('image', {
    reddit_id: DataTypes.STRING,
    title: DataTypes.STRING,
    url: DataTypes.STRING
  }, {});
  image.associate = function(models) {
    image.hasMany(models.user_decision, {
      foreignKey: 'image_id',
      as: 'images',
    });
  };
  return image;
};
