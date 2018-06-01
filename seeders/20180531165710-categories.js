'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {      
      return queryInterface.bulkInsert('Categories', [{
        name: 'All',
        description:'all shirts here!',
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }], {});    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
   return queryInterface.bulkDelete('Categories', null, {});
  }
};
