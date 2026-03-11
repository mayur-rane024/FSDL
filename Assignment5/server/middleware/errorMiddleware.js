export const notFound = (_req, res, _next) => {
  res.status(404);
  throw new Error('Route not found');
};

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || 'Server error',
  });
};
