const router = require("express").Router();
const controller = require("../controllers/auth.controller");
const _ = require("../middlewares/validator.middleware");

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
  .post([_.user, _.fullname, _.email, _.results], controller.createWaitlist);

router;
module.exports = router;
