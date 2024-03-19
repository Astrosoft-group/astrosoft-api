const { AuthorizationError } = require("../helpers/exceptions/error.helper")

exports.user = (req,res,next)=>{
  if(req.user.role !== 'user'){
    throw new AuthorizationError("Forbidden request",{path:'role',field:'request',value:req.user.role})
  }
  next()
}