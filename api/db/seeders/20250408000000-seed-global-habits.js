"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("GlobalHabits", [
      {
        name: "Daily Exercise",
        days: [0, 1, 2, 3, 4, 5, 6], // All days of the week
        everyday: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Reading",
        days: [1, 3, 5], // Monday, Wednesday, Friday
        everyday: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Meditation",
        days: [0, 2, 4, 6], // Sunday, Tuesday, Thursday, Saturday
        everyday: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Healthy Meal",
        days: [0, 1, 2, 3, 4, 5, 6], // All days of the week
        everyday: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Drink Water",
        days: [0, 1, 2, 3, 4, 5, 6], // All days of the week
        everyday: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Journaling",
        days: [0, 6], // Weekends only
        everyday: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("GlobalHabits", null, {});
  },
};
