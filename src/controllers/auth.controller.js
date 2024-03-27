const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");
const AuthService = require("../services/userservices/auth.services");
const tryCatch = require("../utilities/trycatch");
const successHandler = require("../helpers/handlers/success");

exports.signupUser = tryCatch(async (req, res, next) => {
  const user = await AuthService.createUser(req.body);
  successHandler(user,201,"signup successful")(res);
});
exports.signinUser = tryCatch(async (req, res, next) => {
  const user = await AuthService.authenticateUser(req.body);
  const token = jwt.sign({ id: user.id }, jwt_secret);
  successHandler({ ...user,accessToken: token },200, "signin successful")(res);
});

exports.forgotPassword = tryCatch(async (req, res, next) => {
  const user = await AuthService.forgotPassword(req.body);
  successHandler(user,200, "Password reset link sent")(res);
});

exports.resetPassword = tryCatch(async (req, res, next) => {
  const user = await AuthService.resetPassword(req.params);
  successHandler(user,200, "Successful")(res);
});

exports.setNewPassword = tryCatch(async (req, res, next) => {
  const user = await AuthService.changePassword({ ...req.body, ...req.params });
  successHandler(user,200, "Password changed")(res);
});
exports.createWaitlist = tryCatch(async (req, res, next) => {
  const user = await AuthService.createWaitlist(req.body);
  successHandler(user,201, "user successfully added to waitlist")(res);
});
