'use strict';
module.exports = (sequelize, DataTypes) => {
  var Patient = sequelize.define('Patient', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    dob: DataTypes.STRING,
    medication: DataTypes.TEXT,
    dosage: DataTypes.STRING,
    quantity: DataTypes.STRING,
    prescriber: DataTypes.STRING,
    prescriberDEA: DataTypes.STRING,
    pharmacyID: DataTypes.TEXT
  }, {});
  Patient.associate = function(models) {
    // associations can be defined here
  };
  return Patient;
};