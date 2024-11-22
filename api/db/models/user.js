"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: "roleId",
        onDelete: "CASCADE",
      });
      // relation one to many between user and userAchievement
      User.hasMany(models.UserAchievement, { foreignKey: "userId" });
      User.belongsTo(models.Level, { foreignKey: "levelId" });
      User.hasMany(models.Habit, { foreignKey: "userId" }); // верно смотри по юзеру
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      first_registration: DataTypes.DATE,
      last_login: DataTypes.DATE,
      levelId: DataTypes.INTEGER,
      xp: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
