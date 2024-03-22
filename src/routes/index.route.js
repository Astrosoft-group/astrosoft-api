const router = require("express").Router();
const _ = require("../middlewares/validator.middleware");
const { auth } = require("../middlewares/auth.middleware");
const { user } = require("../middlewares/role.middleware");
const controller = require("../controllers/index.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/waitlist")
  .post([_.user, _.fullname, _.email, _.results], controller.createWaitlist)
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    controller.getAllWaitlistUsers
  );

router
  .route("/users")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    controller.getAllUser
  );
module.exports = router;
