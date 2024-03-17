const User = require("../models/user.model")
const _ = require('lodash')
const bcrypt = require('bcryptjs')
const {AuthenticationError,ServerError} = require('../helpers/exceptions/error.helper')

module.exports = class UserService{
    static createUser(data){
        const user = _.pick(data,['fullname','email','password'])
        user['role'] = "user"
        return User.create({...user})
        .then(user=>user)
        .catch(error=>{
            throw new ServerError(error)
        })
    }
    static authenticateUser(data){
        const {email,password} = _.pick(data,['email','password'])
        return User.findOne({where:{email:email}})
        .then(user=>{
            if(!user){
                throw new AuthenticationError("No user associated with email",{path:'email',value:email,field:'body'})
            }
            return bcrypt.compare(password,user.password)
            .then(valid=>{
                if(!valid){
                    throw new AuthenticationError("Incorrect password",{path:'password',value:password,field:'body'})   
                }
            return user['dataValues']
            })
        })
        .catch(error=>{
            if(error instanceof AuthenticationError){
                throw new AuthenticationError(error.message,error.details)
            }else{
                throw new ServerError(error)
            }
           
        })
    }
}
