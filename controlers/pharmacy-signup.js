/**********************************************
*                Rx Control
*               Sign up Route
**********************************************/

const models = require('../db/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('../auth.js');


module.exports = function (app) {
    //Index
    app.get('/signup', function (req, res) {
         // res.render('signup', {});
         res.send('Signup');
     });

    /*****************************************
    * Pharmacy Signup Routes
    *****************************************/

     // Create
     app.post('/signup/pharmacy', (req, res) => {
        // hash the password
        bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            console.log("hash " + hash);
            var newPharmacy = {
                first: req.body.first,
                email: req.body.email,
                password: hash
            };
            models.Pharmacy.create(newPharmacy, {w:1}).then((savedProvider)=>{
                //console.log(savedPharmacy.dataValues.id)
                console.log("saved", savedPharmacy.first)
                auth.setPharmacyIDCookie(savedPharmacy, res);
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
  app.get('/pharmacy/:id', (req, res) => {
    const pharmacyId = req.params.id;
    db.Pharmacy.findById(pharmacyId, { include: [db.Patient] }).then((pharmacy) => {
      res.json(pharmacy);
    });
  });

    // UPDATE
  app.put('/pharmacy/:id/edit', (req, res) => {
    const PharmacyId = req.body.params;
    db.Pharmacy.update(pharmacyId).then((pharmacy) => {
      res.json(200);
      res.json({msg: 'successfully updated', pharmacy});
    }).catch((err) => {
      if(err) {
        res.json(err)
      }
    });
  });


  // DESTROY
  app.delete('/pharmacy/:id', (req, res) => {
    const pharmacyId = req.body.params;
    db.Pharmacy.destroy(pharmacyId).then((pharmacy) => {
      res.status(200);
      res.json({msg: 'successfully deleted', pharmacy});
    }).catch((err) => {
      if (err) {
        res.json(err);
      }
    });
  });


};
