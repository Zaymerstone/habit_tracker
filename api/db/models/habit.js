"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Habit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Habit.hasMany(models.UserAchievement, { foreignKey: "habitId" });
      Habit.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  Habit.init(
    {
      name: DataTypes.STRING,
      max_streak: DataTypes.INTEGER,
      streak: DataTypes.INTEGER,
      days: DataTypes.ARRAY(DataTypes.INTEGER),
      everyday: DataTypes.BOOLEAN,
      lastCompletion: DataTypes.DATE,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Habit",
    }
  );
  return Habit;
};
