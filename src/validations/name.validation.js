const {body} = require('express-validator');

exports.fullname = body('fullname')
.notEmpty().withMessage('The name field is required')
.custom((value,{req})=>{
    if(/[0-9\d@$!%*?&]/.test(value)){
        throw new Error("Kindly enter an valid name")
    }else{
        return !0
    }
})