/*****************************************************
*                   RX CONTROL
*                  MAIN SERVER
******************************************************/
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const hbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const path = require('path');


//Initiate express
const app = express()

// Setting up a PORT number
const PORT = process.env.PORT || 3000

/*******************************************
* SQL Database Connection
*******************************************/
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rxcontrol', process.env.DBUSER, null, { dialect: 'postgres', logging: false });

var models = require("./db/models");
models.sequelize.sync().then(function() {

    console.log('Nice! Database looks fine')

}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});
  /****************************************************
  *  Check for login token on every request
  ***************************************************/

  let verifyAuthentication = (req, res, next) => {
    if (typeof req.cookies.jwtToken === 'undefined' || req.cookies.jwtToken === null) {
      req.user = null;
    } else {
      var token = req.cookies.jwtToken;

      //Synchronous verification
      try{
        decodedToken = jwt.verify(token, process.env.SECRETKEY);
        //console.log("***Authenticate***");
        req.user = decodedToken.id;
      }catch(err){
        console.log("Authentication Error:", err.message);
      };
    };
    next();
  };

let verifyUserLoggedIn = (req, res)=>{
    if(!req.user){
        res.redirect("/");
    };
    next();
};

/***************************************************
* Middleware
***************************************************/

app.use(express.static(__dirname));
app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(verifyAuthentication)

//Handlebars view engine
app.engine('hbs', hbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs')

//Load Routes
require('./controlers/pharmacy-signup.js')(app);
require('./controlers/provider-signup.js')(app);
require('./controlers/index.js')(app);

// Add 404 Page

//Listen PORT number
app.listen(PORT, function() {
    console.log('RxControl listening on port', PORT);
});
