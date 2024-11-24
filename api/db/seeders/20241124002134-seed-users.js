"use strict";
const bcryptjs = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = async (password) => {
      return await bcryptjs.hash(password, 10); // Use bcryptjs for hashing
    };

    await queryInterface.bulkInsert("Users", [
      {
        username: "admin1",
        email: "admin1@example.com",
        image: "https://via.placeholder.com/150",
        password_hash: await hashPassword("admin123"),
        first_registration: new Date(),
        last_login: new Date(),
        levelId: 10, // Admin with high privileges
        xp: 570,
        roleId: 1, // Admin Role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "admin2",
        email: "admin2@example.com",
        image: "https://via.placeholder.com/150",
        password_hash: await hashPassword("admin456"),
        first_registration: new Date(),
        last_login: new Date(),
        levelId: 10,
        xp: 570,
        roleId: 1, // Admin Role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user1",
        email: "user1@example.com",
        image: "https://via.placeholder.com/150",
        password_hash: await hashPassword("user123"),
        first_registration: new Date(),
        last_login: new Date(),
        levelId: 2, // Level based on XP threshold
        xp: 30,
        roleId: 2, // User Role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user2",
        email: "user2@example.com",
        image: "https://via.placeholder.com/150",
        password_hash: await hashPassword("user456"),
        first_registration: new Date(),
        last_login: new Date(),
        levelId: 5,
        xp: 120,
        roleId: 2, // User Role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "user3",
        email: "user3@example.com",
        image: "https://via.placeholder.com/150",
        password_hash: await hashPassword("user789"),
        first_registration: new Date(),
        last_login: new Date(),
        levelId: 3,
        xp: 45,
        roleId: 2, // User Role
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
