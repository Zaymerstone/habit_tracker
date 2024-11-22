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
      UserAchievement.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
      UserAchievement.belongsTo(models.Mastery, { foreignKey: "masteryId" });
    }
  }
  UserAchievement.init(
    {
      userId: DataTypes.BIGINT,
      habitId: DataTypes.BIGINT,
      masteryId: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "UserAchievement",
    }
  );
  return UserAchievement;
};
