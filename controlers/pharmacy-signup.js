/**********************************************
*                Rx Control
*               Sign up Route
**********************************************/

const models = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('../auth.js');


module.exports = function (app) {
    //Index
    app.get('/signup', function (req, res) {
         // res.render('signup', {});
         res.send('Signup');
     });

    // Provider Signup Routes

     // Create
     app.post('/signup/provider', (req, res) => {
        // hash the password
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            console.log("hash " + hash);
            var newPharmacy = {
                first: req.body.first,
                last: req.body.last,
                email: req.body.email,
                password: hash
            };
            models.Provider.create(newProvider, {w:1}).then((savedProvider)=>{
                //console.log(savedPharmacy.dataValues.id)
                console.log("saved", savedProvider.first)
                auth.setPharmacyIDCookie(savedProvider, res);
                return res.status(200).send({ message: 'Created Pharmacy' });

            }).catch((err)=>{
                if(err){
                res.json("Pharmacy Creation error:", err.message);
                }
              })
            })
        });
    });

    // SHOW
  app.get('/provider/:id', (req, res) => {
    const providerId = req.params.id;
    db.Provider.findById(providerId, { include: [db.Item] }).then((provider) => {
      res.json(provider);
    });
  });

    // UPDATE
  app.put('/provider/:id/edit', (req, res) => {
    const PharmacyId = req.body.params;
    db.Provider.update(providerId).then((provider) => {
      res.json(200);
      res.json({msg: 'successfully updated', provider});
    }).catch((err) => {
      if(err) {
        res.json(err)
      }
    });
  });


  // DESTROY
  app.delete('/provider/:id', (req, res) => {
    const providerId = req.body.params;
    db.Provider.destroy(providerId).then((provider) => {
      res.status(200);
      res.json({msg: 'successfully deleted', provider});
    }).catch((err) => {
      if (err) {
        res.json(err);
      }
    });
  });


};
