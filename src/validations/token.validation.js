const {param} = require('express-validator')

exports.reset_token = param('token')
.notEmpty().withMessage('Invalid token provided')
.isLength({min:64}).withMessage("Kindly provide a valid reset token.")
.isAlphanumeric().withMessage("Invalid reset token provided");