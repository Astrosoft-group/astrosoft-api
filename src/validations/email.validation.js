const {check} = require('express-validator')
const User = require('../models/user.model')

exports.user = check('email')
.notEmpty().withMessage("Email field is required")
.isEmail().withMessage("Kindly provide a valid email")
.custom((value,{req})=>{
    return User.findOne({where:{email:value}})
    .then(user=>{
        if(user){
          return  Promise.reject("User already exists with this email address")
        }
    })
})
exports.waitlist_user = check('email')
.notEmpty().withMessage("Email field is required")
.isEmail().withMessage("Kindly provide a valid email")
.custom((value,{req})=>{
    return WaitList.findOne({where:{email:value}})
    .then(user=>{
        if(user){
          return  Promise.reject("User already exists with this email address")
        }
    })
})
.normalizeEmail();
exports.email = check('email')
.notEmpty().withMessage("Email field is required")
.isEmail().withMessage("Kindly provide a valid email")
.normalizeEmail();