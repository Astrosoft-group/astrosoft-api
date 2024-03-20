const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const rootRoutes = require("./routes/index.route");
const authRoutes = require("./routes/auth.route");
const errHandler = require("./middlewares/error.middleware");
const { NotFound } = require("./helpers/exceptions/error.helper");
const _ = require("./config");
const cors = require("cors");
const compression = require("compression");

app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", rootRoutes);
app.use("/api/v1/auth", authRoutes);
app.all("*", (req, res, next) => {
  next(
    new NotFound(`Can't find the URL: ${req.originalUrl} in my server`, {
      path: "URL",
      value: req.originalUrl,
      field: "URL path",
    })
  );
});
app.use(errHandler);
app.use(cors({ optionsSuccessStatus: 200, origin: _.client }));
app.use(compression());

module.exports = app;
