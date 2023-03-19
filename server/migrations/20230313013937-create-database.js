"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createDatabase("erp");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropDatabase("erp");
  },
};
