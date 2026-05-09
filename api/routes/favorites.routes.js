import { Router }          from "express";
import { validateService }  from "../middlewares/validateService.js";
import * as ctrl            from "../controllers/favorites.controller.js";

const router = Router();

router.get("/",                ctrl.listFavorites);
router.post("/:name",          validateService, ctrl.addFavorite);
router.delete("/:name",        validateService, ctrl.removeFavorite);
router.get("/:name/status",    validateService, ctrl.favoriteStatus);
router.post("/:name/start",    validateService, ctrl.favoriteAction("start"));
router.post("/:name/stop",     validateService, ctrl.favoriteAction("stop"));
router.post("/:name/restart",  validateService, ctrl.favoriteAction("restart"));

export default router;