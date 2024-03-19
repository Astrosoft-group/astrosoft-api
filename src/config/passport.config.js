const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const _ = require('../config')
const passport = require('passport')
const User = require('../models/user.model')

const opts = {}
opts['jwtFromRequest'] = ExtractJwt.fromAuthHeaderAsBearerToken()
opts['secretOrKey'] = _.jwt_secret
opts['issuer'] = _.jwt_issuer
opts['audience'] = _.client

passport.use(new JwtStrategy(opts,function(payload,done){
   User.findOne({where:{id:payload.id}})
   .then(user=>{
    if(!user){
       return done(null,false) 
    }
       return done(null,user)
   })
   .catch(error=>{
    done(error,false)
   })
}))

module.exports = passport