/***********************
* Research route
***********************/

module.exports = function(app) {
    app.get('/research', function(res, req) {
        res.render('research')
    })
}
