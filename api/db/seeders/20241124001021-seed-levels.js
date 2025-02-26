"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Levels", [
      { id: 0, breakpoint: 0, createdAt: new Date(), updatedAt: new Date() },
      { id: 1, breakpoint: 15, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, breakpoint: 30, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, breakpoint: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, breakpoint: 75, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, breakpoint: 120, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, breakpoint: 180, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, breakpoint: 255, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, breakpoint: 345, createdAt: new Date(), updatedAt: new Date() },
      { id: 9, breakpoint: 450, createdAt: new Date(), updatedAt: new Date() },
      { id: 10, breakpoint: 570, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Levels", null, {});
  },
};
