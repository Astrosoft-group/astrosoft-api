const passport = require('../config/passport')
const {AuthenticationError} = require('../helpers/exceptions/error.helper')

exports.auth = (req,res,next)=>{
    passport.authenticate('jwt',(err,user,info)=>{
        if(err){
            throw new Error(err)
        }else if(!user){
            throw new AuthenticationError(info,{path:'jwt',field:'header',value:'hidden'})
        }else{
            req.user = user
            next()
        }
    })(req,res,next)
}