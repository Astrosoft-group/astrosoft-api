const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const email = require('../validations/email.validation')
const name = require('../validations/name.validation')
const password = require('../validations/password.validation')
const token = require('../validations/token.validation')
const results = require('../validations/results.validation')
const _ = {...email,...name,...password,...token,results}

router
  .route("/signup")
  .post(
    [_.user, _.fullname, _.password, _.confirm_password, _.results],
    controller.signupUser
  );

router
  .route("/signin")
  .post([_.email, _.password, _.results], controller.signinUser);

router
  .route("/forgot_password")
  .post([_.email, _.results], controller.forgotPassword);

router
  .route(["/reset_password/:token"])
  .get([_.reset_token, _.results], controller.resetPassword)
  .patch([_.reset_token, _.password, _.results], controller.setNewPassword);
  router
  .route("/waitlist")
  .post([_.waitlist_user, _.fullname, _.email, _.results], controller.createWaitlist)

module.exports = router;
