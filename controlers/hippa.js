/**********************************************
*                Rx Control
*               Sign up Route
**********************************************/

const models = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('../auth.js');

modules.exports = function(app) {

    var token = process.env.TOKEN
    var query = req.query

    const https = require("https");
    const url =
      `http://www.HIPAASpace.com/api/npi/validate?q=${query}&rt=json&token=${process.env.TOKEN}`;
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
          // `City: ${body.results[0].formatted_address} -`,
          // `Latitude: ${body.results[0].geometry.location.lat} -`,
          // `Longitude: ${body.results[0].geometry.location.lng}`
        );
      });
    });
};
