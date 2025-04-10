"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserGlobalHabits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      globalHabitId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "GlobalHabits",
          key: "id",
        },
      },
      streak: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      max_streak: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      lastCompletion: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add a unique index to ensure each user has only one instance of each global habit
    await queryInterface.addIndex("UserGlobalHabits", {
      unique: true,
      fields: ["userId", "globalHabitId"],
      name: "unique_user_global_habit",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserGlobalHabits");
  },
};
