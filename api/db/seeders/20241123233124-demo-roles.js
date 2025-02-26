"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add seed commands here
    await queryInterface.bulkInsert("Roles", [
      { id: 1, name: "admin", createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: "user", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Remove seed commands here
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
