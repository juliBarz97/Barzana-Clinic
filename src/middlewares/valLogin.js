const path = require('path');


const { body } = require('express-validator');

const validations = [
    body('email')
        .notEmpty().withMessage('Write an email').bail()
        .isEmail().withMessage('It must be a valid email'),
    body('password')
        .notEmpty().withMessage('Write a password.').bail()
        .isLength({ min : 8 }).withMessage('The password must have 8 characters minimum.'),
]

module.exports = validations;