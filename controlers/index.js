module.exports = (app) => {
    app.get('/', function(req, res) {
       res.render('index');
    });

    app.get('/pharmacist', function(req, res) {
        res.render('portal');
    });

    app.get('/doctor', function(req, res) {
        res.render('doctor-portal');
    });

    app.get('/signup', function(req, res) {
         res.render('reg-selection');
     });

    app.get('/new-doctor', function(req, res) {
        res.render('doc-reg-form');
    });

    app.get('/new-pharmacist', function(req, res) {
        res.render('phar-reg-form');
    });

    app.get('/new-patient', function(req, res) {
        res.render('add-patient');
    });

    app.get('/new-medication', function(req, res) {
        res.render('add-medication');
    });

    app.get('/show-patient', function(req, res) {
        res.render('show-patient', {firstname: 'John', lastname: 'Doe', birthday: '01/20/1996', quantity: 'BID 60 pills', medication: 'Pecocet', dosage: '235mg', date: '02/21/2018' });
    });

    app.get('/login', function(req, res) {
        res.render('login-form');
    });
    //
    // app.get('/show-patient', function(req, res) {
    //     res.render('modal-view');
    // });

    app.get('/profile', function(req, res) {
        res.render('profile')
    })

}
