const userInDB = require('../database/Users')

function userLogged(req, res, next) {
    // middleware aplication that is available for everyone
  
    res.locals.isLogged = false;
    res.locals.isAdmingLogged = false; 

    // if adming logs in
    if (req.session && req.session.userLogged){
        let newUser = req.session.userLogged
        if (newUser.email === 'admin@gmail.com'){
            console.log("si")
            res.locals.isAdminLogged = true;
            res.locals.userLogged = req.session.userLogged
        } else if (req.session && req.session.userLogged){        
        res.locals.isLogged= true;
        res.locals.userLogged = req.session.userLogged; 
        console.log(req.session.userLogged.email) 
    } 
        
}

    next();
    
} 

module.exports = userLogged;