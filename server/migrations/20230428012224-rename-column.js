"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("products", "created", "createdAt");
    await queryInterface.renameColumn("storage", "created", "createdAt");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("products", "createdAt", "created");
    await queryInterface.renameColumn("storage", "createdAt", "created");
  },
};
