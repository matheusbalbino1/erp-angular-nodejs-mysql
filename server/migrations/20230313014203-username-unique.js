"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("users", {
      type: "unique",
      fields: ["username"],
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("users", "username");
  },
};
