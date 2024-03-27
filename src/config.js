const dotenv = require('dotenv').config()

module.exports ={
    port : process.env.PORT,
    db_name:process.env.NODE_ENV === 'development'?
    process.env.LOCAL_DB_NAME:
    process.env.REMOTE_DB_NAME,
    db_user:process.env.NODE_ENV === 'development'?
    process.env.LOCAL_DB_USER:
    process.env.REMOTE_DB_USER,
    db_pass:process.env.NODE_ENV === 'development'?
    process.env.LOCAL_DB_PASS:
    process.env.REMOTE_DB_PASS,
    db_host:process.env.DB_HOST,
    jwt_secret:process.env.JWT_SECRET,
    server:process.env.NODE_ENV === 'development'?
    process.env.LOCAL_SERVER:
    process.env.REMOTE_SERVER,
    jwt_issuer:process.env.NODE_ENV === 'development'?
    null:process.env.REMOTE_SERVER,
    client:process.env.NODE_ENV === 'development'?
    process.env.LOCAL_CLIENT:
    process.env.REMOTE_CLIENT,
}