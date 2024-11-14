const { body } = require('express-validator')

validateUserName = body('name')
    .isLength({min: 4, max: 20}).withMessage('Name must be between 4 and 20 characters long!')

validateEmail = body('email')
    .isEmail().withMessage('Invalid email address!')

validatePassword = body('password')
    .isLength({min: 8, max: 20}).withMessage('Password must be between 8 and 20 characters long!')

validateRoles = body('roles')
    .optional()
    .isArray().withMessage("Please send an array of roles!")

validateAbout = body('about')
    .optional()
    .isLength({min: 0, max: 160}).withMessage('About must be less than 160 characters long!')

exports.validateUserRequestBody = [validateUserName, validateEmail, validatePassword, validateAbout]


