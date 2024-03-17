const {sequelize} = require('../utilities/database')

const Sequelize = require('sequelize')

const User = sequelize.define(
    "User",{
        id:{
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            type:Sequelize.INTEGER
        },
        fullname:{
            type:Sequelize.STRING,
            allowNull:false
        },
        email:{
            type:Sequelize.STRING,
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:Sequelize.STRING,
            allowNull:false,
            validate:{
                min:8
            }
        },
        country:{
            type:Sequelize.STRING
        },
        ipAddress:{
          type:Sequelize.STRING,
        },
        address:{
        type:Sequelize.STRING,
        },
        resetToken:Sequelize.STRING,
        resetTokenExpires:Sequelize.DATE,
        role:{
            type:Sequelize.ENUM(['user','subadmin','admin']),
            allowNull:false
        },
    }
);
require('../hooks/user.hooks')(User);

module.exports = User

