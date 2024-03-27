const {body} = require('express-validator');

exports.password = body('password')
.notEmpty().withMessage("Password field is required")
.isLength({min:8}).withMessage('password must be at least 8 characters')
.matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
.withMessage('Password must contain atleast one lowercase, one uppercase, one digit and one special character')
.isStrongPassword().withMessage('Kindly enter a strong password.')
.trim();
exports.confirm_password = body('confirmPassword')
.custom((value,{req})=>{
    if(value !== req.password){
        throw new Error('Passwords do not match')
    }else{
        return !0
    }
})