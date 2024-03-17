const User = require('../models/user.model')
const Query = require('../services/query.services')
const jwt = require('jsonwebtoken')
const {jwt_secret} = require('../config')
const bcrypt = require('bcryptjs')
const {promisify} = require('util')
const crypto = require('crypto')
const {Op} = require('sequelize')
const UserService = require('../services/user.services')
const tryCatch = require('../utilities/trycatch')

exports.signupUser = tryCatch(async(req,res,next)=>{
    const user = await UserService.createUser(req.body)
    res.status(200).json({
        success:true,
        body:{
            code:200,
            status:'success',
            msg:'User has been created',
            data:user
        }
    })
})
exports.signinUser = tryCatch(async(req,res,next)=>{
      const user = await UserService.authenticateUser(req.body)
      const token = jwt.sign({id:user.id},jwt_secret)
      return res.status(200).json({
        success:true,
        body:{
            code:200,
            status:'success',
            data:{...user,accessToken:token}
        }
    })

})

exports.forgotPassword = (req,res,next)=>{
    const {email} = req.body
    Query.findOne(User,{email})
    .then(user=>{
        if(!user){
            return res.status(401).json({success:false,body:{code:401,status:'Authentication Error',data:[{msg:'No user found!',path:'email',location:'body',value:email}]}})
        } 
       return promisify(crypto.randomBytes)(32)
        .then(randomBytes=>{
            const resetToken = randomBytes.toString('hex')
         user.resetToken = resetToken
         user.resetTokenExpires = new Date(Date.now()+(1000*60*15))
         return user.save()
        })
        .then(savedUser=>{
            return res.status(200).json({success:true,body:{code:200,status:'Success',data:{user:savedUser}}})    
        })
    })
    .catch(error=>{
        console.log(error)
    })
}

exports.resetPassword = (req,res,next)=>{
    const {token} = req.params
    Query.findOne(User,{resetToken:token},{next})
    .then(user=>{
        if(!user){
            return res.status(401).json({success:false,body:{code:401,status:'Authentication Error',data:[{msg:'Invalid reset token!',path:'token',location:'params',value:token}]}})
        }else if(new Date(Date.now())>user.resetTokenExpires){
            return res.status(401).json({success:false,body:{code:401,status:'Authentication Error',data:[{msg:'reset token has expired',path:'token',location:'params',value:token}]}})
        }
        return res.status(200).json({success:true,body:{code:200,status:'Success',data:user}})
    }) 
    .catch(error=>{
        console.log(error)
    })
}

exports.setNewPassword = (req,res,next)=>{
    const {token} = req.params
    const {password} = req.body
    Query.findOne(User,{resetToken:token,resetTokenExpires:{
        [Op.gt]:new Date(Date.now())
    }},{next})
    .then(user=>{
        if(!user){
            return res.status(401).json({success:false,body:{code:401,status:'Authentication Error',data:[{msg:'Invalid reset token!',path:'token',location:'params',value:token}]}})
        }
        bcrypt.hash(password,12)
        .then(hashedPassword=>{
            return Query.update(User,{password:hashedPassword},{res,next},{resetToken:token})
        })
    })
    .catch(error=>{
        console.log(error)
    })
}
