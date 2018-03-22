'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Patients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.STRING
      },
      medication: {
        type: Sequelize.TEXT
      },
      dosage: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.STRING
      },
      prescriber: {
        type: Sequelize.STRING
      },
      prescriberDEA: {
        type: Sequelize.STRING
      },
      pharmacyID: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('Patients');
  }
};