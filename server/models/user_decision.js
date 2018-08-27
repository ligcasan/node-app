'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_decision = sequelize.define('user_decision', {
    user_id: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  user_decision.associate = function(models) {
    user_decision.belongsTo(models.image, {
      foreignKey: 'image_id',
      onDelete: 'CASCADE',
    });
  };
  return user_decision;
};
