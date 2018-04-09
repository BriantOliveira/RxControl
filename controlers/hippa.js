/**********************************************
*                Rx Control
*               Sign up Route
**********************************************/
require('dotenv').config();

const models = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('../auth.js');

modules.exports = function(app) {
    // Stored the token on the env file
    var token = process.env.TOKEN
    var query = req.query

    const https = require("https");
    const lastname = "Goshen";
    const url =
      `http://www.HIPAASpace.com/api/npi/validate?q=${query}&qf=LastName:true:${lastname}-&rt=json&token=${process.env.TOKEN}`
    https.get(url, res => {
      res.setEncoding("utf8");
      //Maybe define outside
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        body = JSON.parse(body);
        console.log(
          
        );
      });
    });
};
