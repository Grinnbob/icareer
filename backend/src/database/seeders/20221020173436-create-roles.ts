/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const creationDate = new Date();
    await queryInterface.bulkInsert(
      'roles',
      [
        {
          value: 'RECRUITER',
          description: 'recruiter',
          createdAt: creationDate,
          updatedAt: creationDate,
        },
        {
          value: 'CANDIDATE',
          description: 'candidate',
          createdAt: creationDate,
          updatedAt: creationDate,
        },
        {
          value: 'ADMIN',
          description: 'admin',
          createdAt: creationDate,
          updatedAt: creationDate,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  },
};
