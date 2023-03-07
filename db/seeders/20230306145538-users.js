'use strict';

const { USER_TABLE } = require('./../models/user.model');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const hash = await bcrypt.hash('admin', 10);
   await queryInterface.bulkInsert(USER_TABLE, [
    {
      email: 'admin@admin.com',
      password: hash,
      role: 'admin',
      create_at: new Date()
    }
  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(USER_TABLE, null, {});
  }
};
