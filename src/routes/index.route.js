const router = require('express').Router()
const _ = require('../controllers/index.controller')
const { auth } = require('../middlewares/auth.middleware')
const { user } = require('../middlewares/role.middleware')



module.exports = router