const path = require('path');


const { body } = require('express-validator');

const validations = [
    body('firstName').notEmpty().withMessage('Write your first name'),
    body('lastName').notEmpty().withMessage('Write your last name'),
    body('email')
        .notEmpty().withMessage('Write an email').bail()
        .isEmail().withMessage('It must be a valid email'),
    body('birthdate').notEmpty().withMessage('Write a date'),
    body('domicilio').notEmpty().withMessage('Write your residence'),
    body('avatar').custom((value,{req }) => {
        let file = req.file;
        console.log(req.file)
        let acceptedExtensions = ['.jpg' , '.png', '.jpeg' , '.JPG' ];
       
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
    body('password').notEmpty().withMessage('Write a password'),   
]

module.exports = validations;