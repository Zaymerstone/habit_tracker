"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GlobalCompletedHabits", {
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
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Add a unique constraint to prevent duplicate completions
    // for the same habit on the same day by the same user
    await queryInterface.addIndex("GlobalCompletedHabits", {
      name: "unique_global_habit_completion_per_day",
      unique: true,
      fields: ["userId", "globalHabitId", "createdAt"],
    });

    // Note: We'll handle the date-level uniqueness in application code
    // by checking if a completion exists for the same day before creating a new one
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("GlobalCompletedHabits");
  },
};
