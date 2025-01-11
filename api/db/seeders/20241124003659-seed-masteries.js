"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Masteries", [
      {
        title: "Bronze",
        streak_target: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Silver",
        streak_target: 14,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Gold",
        streak_target: 21,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Masteries", null, {});
  },
};
