module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        email: 'admin@gmail.com',
        firstName: 'Admin',
        lastName: 'Admin',
        password: 'admin',
        address: 'IU',
        gender: 1,
        phonenumber: '0123456789',
        image: null,
        roleId: '1',
        positionId: 'Professor',

        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};