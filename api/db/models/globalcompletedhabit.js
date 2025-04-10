"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GlobalCompletedHabit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      GlobalCompletedHabit.belongsTo(models.GlobalHabit, {
        foreignKey: "globalHabitId",
      });
      GlobalCompletedHabit.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  GlobalCompletedHabit.init(
    {
      userId: DataTypes.INTEGER,
      globalHabitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "GlobalCompletedHabit",
      indexes: [
        {
          unique: true,
          fields: ["userId", "globalHabitId", "createdAt"],
          name: "unique_global_habit_completion_per_day",
        },
      ],
    }
  );
  return GlobalCompletedHabit;
};
