"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserAchievement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserAchievement.belongsTo(models.Habit, { foreignKey: "habitId" });
      UserAchievement.belongsTo(models.GlobalHabit, {
        foreignKey: "globalHabitId",
      });
      UserAchievement.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      UserAchievement.belongsTo(models.Mastery, { foreignKey: "masteryId" });
    }
  }
  UserAchievement.init(
    {
      userId: DataTypes.INTEGER,
      habitId: DataTypes.INTEGER,
      globalHabitId: DataTypes.INTEGER,
      masteryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserAchievement",
    }
  );
  return UserAchievement;
};
