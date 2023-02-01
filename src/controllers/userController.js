const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
const userList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult} = require('express-validator')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const modelUsers = require('../database/Users')

const userController = 
//controllers to render pages
{
    	register: (req, res) => {	
            res.cookie('testing', 'Hi' , { maxAge : 1000*60})
             res.render('register');
        },
        login: (req,res) => {
            console.log(req.session)
            res.render('login')
        },
        validLogin : (req, res) => {

        let userToLogin = modelUsers.findByField('email' , req.body.email)
        //si lo tengo
        if (userToLogin){
            // check password is correct
                let isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
                if (isOkPassword){
                    delete userToLogin.password;
                    delete userToLogin.cPassword
                    req.session.userLogged = userToLogin
                    console.log(req.session.userLogged)
                    console.log(req.session.userLogged.email)

                  if( req.session.userLogged.email == 'admin@gmail.com'){
                    return res.redirect("/")
                  }
                    return res.redirect("/users/profile")
                }

                if (!isOkPassword){
                    return res.render('login', {
                        errors: {
                            email: {
                                msg : ' Your password is wrong. Please, write it correctly'
                            }
                        }
                    })
                }
            
        }

        // si no lo tengo, envia error

        return res.render('login', {
            errors: {
                email: {
                    msg : ' There is no such email in our database.'
                }
            }
        })

        /*    El que tenia
		 let userToLogin = userList.filter( function(e){
            return e.email == req.body.email;
        })
        console.log(userToLogin)
       
        //console.log(userToLogin[0].password);
        //console.log(req.body.password);
        if (!userToLogin) {
            return	res.render( 'users/login' );
        }
        
        if (userToLogin) {
            const isPasswordOk = bcrypt.compareSync(req.body.password, userToLogin[0].password);
            
            if (!isPasswordOk) {
                return res.render( 'users/login' );
            } else {			 
               delete userToLogin[0].password; //no borra, habria que reveerlo 
               req.session.userLogged = userToLogin[0];
               console.log("//")
               console.log(req.session.userLogged)
               console.log("//")
               if(req.body.recordarUsuario) {
                   res.cookie('userEmail', req.body.email , { maxAge : (1000*60)})
               }

               return res.redirect("/users/profile");
           } 
        }*/
        },
        profile: (req, res) => {
           // console.log(req.cookie.userEmail)
			/*let user = {
				firstName: req.session.userLogged.firstName,
				lastName: req.session.userLogged.lastName,
				phone: req.session.userLogged.phone,
				birthdate: req.session.userLogged.birthdate,
                city: req.session.userLogged.city,
				email: req.session.userLogged.email
			};
*/
            return res.render('profile', {user : req.session.userLogged})
        },
//controllers to create and modify users        
        createUser: (req, res) => {

            const resultValidation = validationResult(req);
            console.log(resultValidation)
            if (resultValidation.errors.length > 0 ){
                console.log(resultValidation.errors)
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData : req.body })
            } else { 
                console.log("no hay errores")
            }
            // se puede usar segun Javi
            // user.create(req.body)

            let newID=(userList[userList.length-1].id)+1 
            console.log(req.file)
            console.log(req.body)

            let userInDB = modelUsers.findByField('email', req.body.email)
            // if user already exists 
            if (userInDB){
                return res.render('register', {
                    errors:{
                        email: {
                            msg :' This email was already created'
                        }
                    },
                    oldData : req.body })
            }
            

            let newUser = {
                // tmb podira usar spread op?
                
                id: newID,
             /*   firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: bcrypt.hashSync(req.body.password, 10),
                cPassword: req.body.cPassword,
                phone: req.body.phone, 
                birthdate: req.body.birthdate,
                city: req.body.city,
                email: req.body.email,
                image: req.body.avatar, */
                ...req.body,
                image: req.file.filename,
                password: bcrypt.hashSync(req.body.password, 10) // pisa al password de req.body

            }
            
            
            console.log(newUser)
            userList.push(newUser)
           
            fs.writeFileSync(usersFilePath, JSON.stringify(userList,null,' '));
        
            res.redirect('/');
        },
        logout: (req,res) => {
            req.session.destroy();
            return res.redirect('/')
        },
}

module.exports = userController;
