/****************************************************
     *  LOGIN ROUTES
     ***************************************************/
    app.get('/login', function(req, res) {
         res.render('login');
     });

    // Compares if password given is correct in the database
    app.post('/login', (req, res) => {
        console.log("email", req.body.email)
         models.User.findOne({where:{email: req.body.email}}).then(function(data) {
                    // console.log("Returned Data", data)
                    //  console.log("db email", data.email)
                    //  console.log("DB User Password", data.password)
                    //  console.log("client email", req.body.email)
                    // console.log("client submitted passwd", req.body.password)
           bcrypt.compare(req.body.password, data.password, function(err, result) {
                if(err) {
                     res.status(400)
                     console.log(err)
                }
                if(result){
                    //Set authentication cookie
                    console.log("resulting result", result)
                    auth.setUserIDCookie(data, res);
                    res.redirect('/')
                }else{
                    console.log('wrong username or password')
                }
            });
    });
});

/****************************************************
 *  LOGOUT ROUTE
 ***************************************************/
 app.get('/logout', function(req, res) {
   res.clearCookie('jwtToken');
   res.redirect('/')
 });
};
