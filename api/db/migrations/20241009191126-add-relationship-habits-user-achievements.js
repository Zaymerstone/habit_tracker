'use strict';

// migration for adding foreign key to habit column in UserAchievements table
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('UserAchievements', 'habit', { 
      references: {
        model: "Habits",
        key: "id"
      },
      type: Sequelize.BIGINT,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('UserAchievements', 'habit', {
      type: Sequelize.BIGINT
    });
  }
};
