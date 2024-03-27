const User = require("../../models/user.model");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../../config");
const bcrypt = require("bcryptjs");
const {AuthenticationError} = require("../../helpers/exceptions/error.helper");
const errorHandler = require("../../helpers/handlers/error");
const { promisify } = require("util");
const crypto = require("crypto");
const { Op } = require("sequelize");

module.exports = class AuthService {
  static createUser(data) {
    const user = _.pick(data, ["fullname", "email", "password"]);
    user["role"] = "user";
    return User.create({ ...user })
      .then((user) => user)
      .catch((error) => errorHandler(error));
  }
  static authenticateUser(data) {
    const { email, password } = _.pick(data, ["email", "password"]);
    return User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          throw new AuthenticationError("Incorrect email address", {
            path: "email",
            value: email,
            field: "body",
          });
        }
        return bcrypt.compare(password, user.password).then((valid) => {
          if (!valid) {
            throw new AuthenticationError("Incorrect password", {
              path: "password",
              value: password,
              field: "body",
            });
          }
          return user["dataValues"];
        });
      })
      .catch((error) => errorHandler(error));
  }
  static forgotPassword(data) {
    const { email } = _.pick(data, ["email"]);
    return User.findOne({ where: { email: email } })
      .then((user) => {
        if (!user) {
          throw new AuthenticationError("No user found", {
            path: "email",
            value: email,
            field: "body",
          });
        }
        return promisify(crypto.randomBytes)(32)
          .then((randomBytes) => {
            const resetToken = randomBytes.toString("hex");
            user.resetToken = resetToken;
            user.resetTokenExpires = new Date(Date.now() + 1000 * 60 * 15);
            return user.save();
          })
          .then((savedUser) => savedUser["dataValues"]);
      })
      .catch((error) => errorHandler(error));
  }
  static resetPassword(data) {
    const { token: resetToken } = _.pick(data, ["token"]);
    return User.findOne({ where: { resetToken } }).then((user) => {
      if (!user || new Date(Date.now()) > user.resetTokenExpires) {
        throw new AuthenticationError("Invalid reset token", {
          path: "token",
          field: "params",
          value: resetToken,
        });
      }
      return user["dataValues"];
    });
  }
  static changePassword(data) {
    const { token: resetToken, password } = _.pick(data, ["token", "password"]);
    return User.findOne({
      where: {
        resetToken,
        resetTokenExpires: {
          [Op.gt]: new Date(Date.now()),
        },
      },
    })
      .then((user) => {
        if (!user) {
          throw new AuthenticationError("Invalid reset token", {
            path: "token",
            value: resetToken,
            field: "params",
          });
        }
        return this.setNewPassword(user, password);
      })
      .catch((error) => errorHandler(error));
  }

  static setNewPassword(instance, data) {
    return bcrypt
      .hash(data, 12)
      .then((password) => {
        instance["password"] = password;
        return instance.save();
      })
      .then((user) => user)
      .catch((error) => errorHandler(error));
  }
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
};
