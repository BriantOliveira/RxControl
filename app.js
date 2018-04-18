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
const fetch = require('node-fetch');
const mailgun = require('mailgun-js')


//Initiate express
const app = express()

// Setting up a PORT number
const PORT = process.env.PORT || 4000

/*******************************************
* SQL Database Connection
*******************************************/
const Sequelize = require('sequelize');
const sequelize = new Sequelize('rxcontrol', process.env.DBUSER, null, { dialect: 'postgres', logging: false });

var models = require("./db/models");
models.sequelize.sync().then(function() {

    console.log('Database is validated and everything seems fine!')

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

app.get('/test', (req, res) => {
    // show form
    // render form
    res.send('This is the validation form')
});

app.post('/test', (req, res) => {
    // send form
    // collect form data
    // send form data ...
    const https = require("https");
    const lastname = "Goshen";
    const query = '1861582694';
    const token = process.env.TOKEN;
    const url =
      `http://www.HIPAASpace.com/api/npi/validate?q=${query}&qf=LastName:true:${lastname}&rt=json&token=${token}`;
      console.log(url);
    fetch(url).then((res) => {
        return res.json();
    }).then((json) => {
        res.send(json);
        console.log(json);
    }).catch((err) => {
        console.log(err.message);
    })
})


//Load Routes
require('./controlers/index.js')(app);
require('./controlers/pharmacy-dashboard.js')(app);
require('./controlers/registration-selection.js')(app);

// Add 404 Page


//MAIL GUN
function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

app.post('/', (req, res) => {
    let data;
    let api_key = 'key-b2e232b515e23a91805b4ca0ae9c098a';
    let domain = 'sandbox327e859bafc442479e7384439df8c22c.mailgun.org';
    let mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});


    data = {
        from: 'RxControl Team <postmaster@sandbox327e859bafc442479e7384439df8c22c.mailgun.org>',
        to: 'briantmoliveira@gmail.com',
        subject: 'Contact us',
        text: 'From: ' + req.body.name + '(' + req.body.email + ')\n' + req.body.body
    };

    mailgun.messages().send(data, function (err, body) {
        if (err) {
            // res.render('index', {error: err});
            console.log("got an error: ", err);
        }
    });
});


//Listen PORT number
app.listen(PORT, function() {
    console.log('RxControl listening on port', PORT);
});
