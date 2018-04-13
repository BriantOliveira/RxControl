/*************************
* Pharmacy Dashboard
*************************/

module.exports = function(app) {

    app.get('/pharmacy', (req, res) => {
        res.render('pharmacist-portal')
    })
};
