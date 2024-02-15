const User = require('../models/user.model')
const Crud = require('../services/query.services')

exports.signupUser = (req,res,next)=>{
    const {fullname,email,password} = req.body
    Crud.insert(User,{
        fullname,email,password,role:'user'
    },{
        res,next
    })
}