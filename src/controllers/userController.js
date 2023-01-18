const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/users.json');
const userList = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
const {validationResult} = require('express-validator')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");



const userController = 
//controllers to render pages
{
    	register: (req, res) => {	
             res.render('register');
        },
        login: (req,res) => {
            res.render('login')
        },
        profile: (req, res) => {
            res.render('profile')
        },
//controllers to create and modify users        
        createUser: (req, res) => {

            const resultValidation = validationResult(req);
        
            if (resultValidation.errors.length > 0 ){
                return res.render('users/register', {
                    errors: resultValidation.mapped(),
                    oldData : req.body })
            }


            let newID=(userList[userList.length-1].id)+1 
            console.log(req.file)
            console.log(req.body.avatar)
            let newUser = {
                id: newID,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                password: bcrypt.hashSync(req.body.password, 10),
                cPassword: req.body.cPassword,
                phone: req.body.phone, 
                birthdate: req.body.birthdate,
                city: req.body.city,
                email: req.body.email,
                image: req.body.avatar,

            }
            console.log(newUser)
            userList.push(newUser)
           
            fs.writeFileSync(usersFilePath, JSON.stringify(userList,null,' '));
        
            res.redirect('/');
        }
}

module.exports = userController;
