const Sequelize = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
    dialect: "mysql",
    host: config.db_host,
  }
);

const connectToDB = () => {
  return sequelize.authenticate();
};

module.exports = {
  sequelize,
  connectToDB,
};
