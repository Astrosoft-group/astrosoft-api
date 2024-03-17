const Server = require('http').createServer(require('./app'))
const {port} = require('./config')
const {sequelize,connectToDB} = require('./utilities/database')
const User = require('./models/user.model')

connectToDB()
.then(connected=>{
    return sequelize.sync()
})
.then(synced=>{
    Server.listen(port,()=>{
        console.log("Listening on port "+port)
    })
})
.catch(error=>{
    console.log(error)
})

