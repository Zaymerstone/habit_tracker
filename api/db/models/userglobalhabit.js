"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGlobalHabit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGlobalHabit.belongsTo(models.GlobalHabit, {
        foreignKey: "globalHabitId",
      });
      UserGlobalHabit.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  UserGlobalHabit.init(
    {
      // User ID this progress belongs to
      userId: DataTypes.INTEGER,
      // Reference to the global habit
      globalHabitId: DataTypes.INTEGER,
      // Current streak
      streak: DataTypes.INTEGER,
      // Maximum streak achieved
      max_streak: DataTypes.INTEGER,
      // Date of last completion
      lastCompletion: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "UserGlobalHabit",
    }
  );
  return UserGlobalHabit;
};
