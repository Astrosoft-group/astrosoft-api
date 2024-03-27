const {NotFound} = require('../helpers/exceptions/error.helper')

module.exports = (req, res, next) => {
    next(
      new NotFound(`Can't find the URL: ${req.originalUrl} in my server`, {
        path: "URL",
        value: req.originalUrl,
        field: "URL path",
      })
    );
  }