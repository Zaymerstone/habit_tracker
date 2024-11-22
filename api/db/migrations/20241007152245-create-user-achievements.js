"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("UserAchievements", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      habitId: {
        type: Sequelize.BIGINT,
        references: {
          model: "Habits",
          key: "id",
        },
      },
      masteryId: {
        type: Sequelize.BIGINT,
        references: {
          model: "Masteries",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("UserAchievements");
  },
};
