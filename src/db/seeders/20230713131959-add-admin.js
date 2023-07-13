'use strict';
const {v4: uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: uuidv4(),
        name: 'Admin',
        email: 'admin@example.com',
        password: 'qwerty123',
        role: 'ADMIN',
        access_token: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
