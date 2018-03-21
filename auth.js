const jwt = require('jsonwebtoken')

exports.createJWT = function(dbObject){
    return jwt.sign({ id: dbObject.dataValues.id }, process.env.SECRETKEY);
}

exports.cookieOptions = function(){
    //Cookie should be good for 48 hours
    let jsonObject = {
        maxAge: 172800000,
        httpOnly: true
    }
    return jsonObject
}

exports.setUserIDCookie = function(dbObject, resObject){
    token = jwt.sign({ id: dbObject.dataValues.id }, process.env.SECRETKEY);
    cookieOptions = {
        maxAge: 172800000,
        httpOnly: true
    };
    resObject.cookie('jwtToken', token, cookieOptions);
}
