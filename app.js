const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const rootRoutes = require('./routes/index');
const authRoutes = require('./routes/auth')

app.use(express.static('public'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use('/api/v1',rootRoutes)
app.use('/api/v1/auth',authRoutes)

module.exports = app
