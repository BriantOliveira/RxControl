'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pharmacy = sequelize.define('Pharmacy', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    NPI: DataTypes.STRING,
    DEA: DataTypes.STRING,
    licenseNumber: DataTypes.STRING,
    HIN: DataTypes.STRING,
    phone: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Pharmacy.associate = function(models) {
    // associations can be defined here
  };
  return Pharmacy;
};