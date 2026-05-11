import express           from "express";
import servicesRoutes    from "./routes/services.routes.js";
import favoritesRoutes   from "./routes/favorites.routes.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    api: "systemctl REST API", version: "2.0.0",
    routes: {
      "GET    /services":                "Lister tous les services",
      "GET    /services?state=active":   "Filtrer par état",
      "GET    /services/failed":         "Services en échec",
      "GET    /services/:name":          "Détails d'un service",
      "GET    /services/:name/status":   "Status brut systemctl",
      "GET    /services/:name/logs":     "Logs journalctl",
      "POST   /services/:name/start":    "Démarrer",
      "POST   /services/:name/stop":     "Arrêter",
      "POST   /services/:name/restart":  "Redémarrer",
      "POST   /services/:name/reload":   "Recharger la config",
      "POST   /services/:name/enable":   "Activer au boot",
      "POST   /services/:name/disable":  "Désactiver au boot",
      "GET    /favorites":               "Lister les favoris",
      "POST   /favorites/:name":         "Ajouter un favori",
      "DELETE /favorites/:name":         "Retirer un favori",
      "GET    /favorites/:name/status":  "Status d'un favori",
      "POST   /favorites/:name/start":   "Démarrer un favori",
      "POST   /favorites/:name/stop":    "Arrêter un favori",
      "POST   /favorites/:name/restart": "Redémarrer un favori",
    },
  });
});

app.use("/api/services",  servicesRoutes);
app.use("/api/favorites", favoritesRoutes);

// Ces deux middlewares DOIVENT être en dernier
app.use(notFound);
app.use(errorHandler);

export default app;