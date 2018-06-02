'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {      
    var categories=[
      {
        name: 'All',
        description:'all shirts here!'
      }    
    ];
      return queryInterface.bulkInsert('Categories', categories, {});    
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
