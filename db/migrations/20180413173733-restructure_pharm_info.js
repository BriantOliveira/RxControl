'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pharmacies', {
      name: {
        type:Sequelize.STRING
      },
      email:{
        type:Sequelize.STRING
      },
      password:{
        type:Sequelize.STRING
      },
      address:{
        type:Sequelize.TEXT
      },
      npi:{
        type:Sequelize.STRING
      },
      dea:{
        type:Sequelize.STRING
      },
      licenseNumber:{
        type:Sequelize.STRING
      },
      hin: {
        type:Sequelize.STRING
      },
      phone:{
        type:Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
      });
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.dropTable('Pharmacies');
  }
};
