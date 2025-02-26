"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CompletedHabit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CompletedHabit.belongsTo(models.Habit, { foreignKey: "habitId" });
      CompletedHabit.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  CompletedHabit.init(
    {
      userId: DataTypes.INTEGER,
      habitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CompletedHabit",
    }
  );
  return CompletedHabit;
};
