'use strict';
module.exports = (sequelize, DataTypes) => {
  var Provider = sequelize.define('Provider', {
    firstname: {type:DataTypes.STRING},
    lastname: {type:DataTypes.STRING},
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.TEXT,
    NPI: DataTypes.STRING,
    DEA: DataTypes.STRING,
    licenseNumber: DataTypes.STRING,
    HIN: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  Provider.associate = function(models) {
    // associations can be defined here
  };
  return Provider;
};
