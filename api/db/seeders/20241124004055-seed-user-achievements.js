"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert("UserAchievements", [
    //   {
    //     userId: 1, // admin1
    //     habitId: 1, // habit1
    //     masteryId: 1, // Bronze
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    //   {
    //     userId: 2, // admin2
    //     habitId: 2, // habit2
    //     masteryId: 2, // Silver
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   },
    // ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserAchievements", null, {});
  },
};
