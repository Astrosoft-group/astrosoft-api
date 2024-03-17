const { ServerError, AuthenticationError } = require("../exceptions/error.helper");

module.exports = customErrorHandlers = (error)=>{
   if(error instanceof AuthenticationError){
    throw new AuthenticationError(error.message,error.details)
   }else{
    throw new ServerError(error)
   }
}