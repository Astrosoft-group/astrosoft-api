module.exports = (err, req, res, next) => {
  const statusCode = err.code || 500;
  const errorStack =
    process.env.NODE_ENV === "development"
      ? err.stack
      : "Contact the developers to know more about this error";
  res.status(statusCode).json({
    success: false,
    body: {
      status: "error",
      code: statusCode,
      data: {
        msg: err.message,
        stack: errorStack,
        value: err.details?.value,
        path: err.details?.path,
        field: err.details?.field,
      },
    },
  });
};
