"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here
    await queryInterface.bulkInsert("Roles", [
      { name: "admin", createdAt: new Date(), updatedAt: new Date() },
      { name: "user", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove seed commands here
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
