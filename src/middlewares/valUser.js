const path = require('path');


const { check } = require('express-validator');

const validations = [
    check('firstName').notEmpty().withMessage('Write your first name'),
    check('lastName').notEmpty().withMessage('Write your last name'),
    check('email')
        .notEmpty().withMessage('Write an email').bail()
        .isEmail().withMessage('It must be a valid email'),
    check('birthdate').notEmpty().withMessage('Write a date'),
    check('city').notEmpty().withMessage('Write your residence'),
    check('avatar').custom((value,{req }) => {
        let file = req.file;
        console.log(req.file)
        let acceptedExtensions = ['.jpg' , '.png', '.jpeg', '.JPG' ];
       
        if (!file) {
            throw new Error('Upload an image');
        } else { 
             let fileExtensions = path.extname(file.originalname);
            if (acceptedExtensions.includes(fileExtensions)===false){
                throw new Error('Los archivos permitidos son ' + acceptedExtensions.join(', '))
            }
        };    
        return true; 
    }), 
    check('password').notEmpty().withMessage('Write a password'),   
]

module.exports = validations;