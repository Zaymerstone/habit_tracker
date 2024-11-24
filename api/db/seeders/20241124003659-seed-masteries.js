"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Masteries", [
      {
        title: "Bronze",
        streak_target: 7,
        img_url: "https://via.placeholder.com/150/bronze", // Use an appropriate URL for the bronze image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Silver",
        streak_target: 14,
        img_url: "https://via.placeholder.com/150/silver", // Use an appropriate URL for the silver image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Gold",
        streak_target: 21,
        img_url: "https://via.placeholder.com/150/gold", // Use an appropriate URL for the gold image
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Masteries", null, {});
  },
};
