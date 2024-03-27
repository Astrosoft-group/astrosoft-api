const {validationResult} = require('express-validator')

module.exports = (req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(422).json({success:false,body:{code:422,status:'Validation Error',data:[...errors.array()]}})
    }
    next()
  }