'use strict';
module.exports = (sequelize, DataTypes) => {
  const recommendation = sequelize.define('recommendation', {
    user_id: DataTypes.STRING
  }, {});
  recommendation.associate = function(models) {
    recommendation.belongsTo(models.image, {
      foreignKey: 'image_id',
      onDelete: 'CASCADE',
    });
  };
  return recommendation;
};
