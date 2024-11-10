'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAchievement.belongsTo(models.Habit, { foreignKey: "habit" })
      UserAchievement.belongsTo(models.User, { foreignKey: "user" })
      UserAchievement.belongsTo(models.Mastery, { foreignKey: "mastery" })
    }
  }
  UserAchievement.init({
    user: DataTypes.BIGINT,
    habit: DataTypes.BIGINT,
    mastery: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'UserAchievement',
  });
  return UserAchievement;
};