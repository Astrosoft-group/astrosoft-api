const User = require('../models/user.model')
const Query = require('../services/query.services')

exports.signupUser = (req,res,next)=>{
    const {fullname,email,password} = req.body
    Query.insert(User,{
        fullname,email,password,role:'user'
    },{
        res,next
    })
}