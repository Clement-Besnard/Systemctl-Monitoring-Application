import { validateServiceName } from "../lib/systemctl.js";

export function validateService(req, res, next) {
  if (!validateServiceName(req.params.name)) {
    const err  = new Error("Nom de service invalide.");
    err.status = 400;
    return next(err);  // ← passe à errorHandler, pas de res.json ici
  }
  next();
}