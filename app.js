/*****************************************************
*                   RX CONTROL
*                  MAIN SERVER
******************************************************/

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

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err.message);
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


// Add 404 Page


//Listen PORT number

app.listen(PORT, function() {
    console.log('RxControl listening on port', PORT);
});
