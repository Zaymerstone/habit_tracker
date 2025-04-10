"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Masteries", [
      {
        id: 1,
        title: "Bronze",
        streak_target: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Silver",
        streak_target: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "Gold",
        streak_target: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        title: "Platinum",
        streak_target: 35,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: "Diamond",
        streak_target: 56,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        title: "Master",
        streak_target: 84,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        title: "Grandmaster",
        streak_target: 119,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        title: "Legend",
        streak_target: 168,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Masteries", null, {});
  },
};
