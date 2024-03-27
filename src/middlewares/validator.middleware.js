const {check,body,param,validationResult} = require('express-validator')
const User = require('../models/user.model')
const WaitList = require('../models/waitlist.model')

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
exports.password = body('password')
.notEmpty().withMessage("Password field is required")
.isLength({min:8}).withMessage('password must be at least 8 characters')
.matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
.withMessage('Password must contain atleast one lowercase, one uppercase, one digit and one special character')
.isStrongPassword().withMessage('Kindly enter a strong password.')
.trim();
exports.fullname = body('fullname')
.notEmpty().withMessage('The name field is required')
.custom((value,{req})=>{
    if(/[0-9\d@$!%*?&]/.test(value)){
        throw new Error("Kindly enter an valid name")
    }else{
        return !0
    }
})
exports.confirm_password = body('confirmPassword')
.custom((value,{req})=>{
    if(value !== req.password){
        throw new Error('Passwords do not match')
    }else{
        return !0
    }
})
exports.reset_token = param('token')
.notEmpty().withMessage('Invalid token provided')
.isLength({min:64}).withMessage("Kindly provide a valid reset token.")
.isAlphanumeric().withMessage("Invalid reset token provided");
exports.results = (req,res,next)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(422).json({success:false,body:{code:422,status:'Validation Error',data:[...errors.array()]}})
  }
  next()
}
