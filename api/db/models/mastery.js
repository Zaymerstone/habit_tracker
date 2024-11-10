'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mastery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mastery.hasMany(models.UserAchievement, { foreignKey: "mastery" })
    }
  }
  Mastery.init({
    title: DataTypes.STRING,
    streak_target: DataTypes.INTEGER,
    img_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Mastery',
  });
  return Mastery;
};