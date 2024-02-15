const router = require('express').Router()
const controller = require('../controllers/auth.controller')
const _ = require('../middlewares/validator.middleware')

router
.route('/signup')
.post([_.user,_.fullname,_.password,_.confirm_password,_.results],controller.signupUser)
module.exports = router