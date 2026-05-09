export function notFound(req, res, next) {
  const err  = new Error(`${req.originalUrl} introuvable.`);
  err.status = 404;
  next(err);
}

// Middleware d'erreur Express : DOIT avoir 4 paramètres
export function errorHandler(err, req, res, next) {
  res.status(err.status || 500).json({
    error:   err.status === 400 ? "Bad Request"
           : err.status === 404 ? "Not Found"
           : "Internal Server Error",
    message: err.message,
  });
}