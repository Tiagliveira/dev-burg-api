'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('products', 'sold_count', {
     type: Sequelize.INTEGER,
     defaultValue: 0,
     allowNull: false,
    });
   await queryInterface.addColumn('products', 'rating_average', {
     type: Sequelize.FLOAT,
     defaultValue: 0,
     allowNull: false,
    });
   await queryInterface.addColumn('products', 'rating_count', {
     type: Sequelize.INTEGER,
     defaultValue: 0,
     allowNull: false,
    });
     
  },

  async down (queryInterface) {
     await queryInterface.removeColumn('products', 'sold_count');
     await queryInterface.removeColumn('products', 'rating_average');
     await queryInterface.removeColumn('products', 'rating_count');
     
  }
};
