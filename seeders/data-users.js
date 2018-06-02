'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var users=[
        {
            
        }
    ];
    return queryInterface.bulkInsert('Shirts',shirts,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shirts', null, {});
  }
};
