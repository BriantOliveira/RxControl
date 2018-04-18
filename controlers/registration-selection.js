/****************************************
*  Pharmacist Registration
****************************************/

module.exports = function(app) {

    app.get('/new-pharmacist', function (req, res){
        res.status(200)
        res.render('pharmacy-resgistration')
    });

};
