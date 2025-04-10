"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GlobalHabit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GlobalHabit.hasMany(models.UserGlobalHabit, {
        foreignKey: "globalHabitId",
      });
      GlobalHabit.hasMany(models.GlobalCompletedHabit, {
        foreignKey: "globalHabitId",
      });
      GlobalHabit.hasMany(models.UserAchievement, {
        foreignKey: "globalHabitId",
      });
    }
  }
  GlobalHabit.init(
    {
      name: DataTypes.STRING,
      // Days the habit is scheduled for (array of weekdays 0-6)
      days: DataTypes.ARRAY(DataTypes.INTEGER),
      // Indicates if habit is scheduled for every day
      everyday: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "GlobalHabit",
    }
  );
  return GlobalHabit;
};
