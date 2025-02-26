"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("Habits", [
    //   {
    //     name: "Push-ups",
    //     max_streak: 7,
    //     streak: 5,
    //     userId: 1, // Assuming the userId 1 is for admin1 (can change based on your database)
    //     days: [0, 3, 6],
    //     everyday: false,
    //     lastCompletion: new Date(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     name: "Running",
    //     max_streak: 14,
    //     streak: 10,
    //     userId: 2, // Assuming the userId 2 is for user1 (can change based on your database)
    //     days: null,
    //     everyday: true,
    //     lastCompletion: null,
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Habits", null, {});
  },
};
