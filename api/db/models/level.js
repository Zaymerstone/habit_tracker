'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Level.hasMany(models.User, {foreignKey: "level"}) // foreign key in table users is level
    }
  }
  Level.init({
    breakpoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Level',
  });
  return Level;
};