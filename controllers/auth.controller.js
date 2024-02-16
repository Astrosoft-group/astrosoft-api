const User = require('../models/user.model')
const Query = require('../services/query.services')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config')

exports.signupUser = (req,res,next)=>{
    const {fullname,email,password} = req.body
    Query.insert(User,{
        fullname,email,password,role:'user'
    },{
        res,next
    })
}
exports.signinUser = (req,res,next)=>{
    const {email,password} = req.body
    Query.findOne(User,{email},{next})
    .then(user=>{
        if(!user){
        return res.status(401).json({success:false,body:{code:401,status:'Authentication Error',data:[{msg:'Incorrect email or password',path:'email',location:'body',value:email}]}})
        }
      const token = jwt.sign({id:user.id},jwt_secret)
      return res.status(200).json({success:true,body:{code:200,status:'Success',data:{user,accessToken:token}}})
    })
    .catch(error=>{
        console.log(error)
    })
}