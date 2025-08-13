export const globalError = async (err, req, res, next) => {

  return res.status(err.cause || 500).json({
    message: err.message,
    success: false,
    status: err.cause || 500,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
