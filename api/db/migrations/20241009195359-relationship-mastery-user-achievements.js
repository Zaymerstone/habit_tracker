'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.changeColumn("UserAchievements", "mastery", {
    references:{
      model: "Masteries",
      key: "id"
    },
    type: Sequelize.INTEGER
   });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("UserAchievements", "mastery",{
      type: Sequelize.INTEGER
    });
  }
};
