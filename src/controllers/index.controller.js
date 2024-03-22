const AuthService = require("../services/userservices/auth.services");
const UserService = require("../services/userservices/user.services");
const tryCatch = require("../utilities/trycatch");
const successHandler = require("../helpers/handlers/success");

exports.createWaitlist = tryCatch(async (req, res, next) => {
  const user = await UserService.createWaitlist(req.body);
  successHandler(user, "user successfully added to waitlist")(res);
});

exports.getAllWaitlistUsers = tryCatch(async (req, res, next) => {
  const user = await UserService.getAllWaitlistUsers();
  successHandler(user, "Successfully fetched all registered waitlist")(res);
});

exports.getAllUser = tryCatch(async (req, res, next) => {
  const user = await UserService.getAllUsers();
  res.status(200).json({
    status: "sucess",
    numberOfUsers: user.length,
    data: {
      user,
    },
  });
});
