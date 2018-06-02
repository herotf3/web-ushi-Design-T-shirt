'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    var shirts=[
      {
        name: "Toxic mask",
        price: 120000,
        img_url: "/img/shirt/toxic.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: "Trà sữa",
        price: 150000,
        img_url: "/img/shirt/softdrink.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: "Starwar winter",
        price: 120000,
        img_url: "/img/shirt/3cold.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: "Cut you",
        price: 135000,
        img_url: "/img/shirt/cutU.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: "Dead skull",
        price: 100000,
        img_url: "/img/shirt/dead.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: "Song miêu",
        price: 150000,
        img_url: "/img/shirt/dubcat.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      },
      {
        name: "Proud of Dad",
        price: 220000,
        img_url: "/img/shirt/proud_dad.jpg",
        createdAt: Sequelize.literal('NOW()'),
        updatedAt: Sequelize.literal('NOW()')
      }
    ];
    return queryInterface.bulkInsert('Shirts',shirts,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shirts', null, {});
  }
};
