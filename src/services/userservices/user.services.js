const _ = require("lodash");
const User = require("../../models/user.model");
const WaitList = require("../../models/waitlist.model");

module.exports = class UserService {
  static createWaitlist(data) {
    const user = _.pick(data, [
      "fullname",
      "email",
      "userCategory",
      "state",
      "city",
    ]);
    return WaitList.create({ ...user })
      .then((user) => user)
      .catch((error) => errorHandler(error));
  }

  static getAllWaitlistUsers() {
    return WaitList.findAll()
      .then()
      .catch((error) => errorHandler(error));
  }

  static getAllUsers() {
    return User.findAll()
      .then()
      .catch((error) => errorHandler(error));
  }
};
