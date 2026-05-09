import { Router }          from "express";
import { validateService }  from "../middlewares/validateService.js";
import * as ctrl            from "../controllers/services.controller.js";

const router = Router();

router.get("/",               ctrl.listServices);
router.get("/failed",         ctrl.listFailed);
router.get("/:name",          validateService, ctrl.getService);
router.get("/:name/status",   validateService, ctrl.getServiceStatus);
router.get("/:name/logs",     validateService, ctrl.getServiceLogs);

router.post("/:name/start",   validateService, ctrl.serviceAction("start"));
router.post("/:name/stop",    validateService, ctrl.serviceAction("stop"));
router.post("/:name/restart", validateService, ctrl.serviceAction("restart"));
router.post("/:name/reload",  validateService, ctrl.serviceAction("reload"));
router.post("/:name/enable",  validateService, ctrl.serviceAction("enable"));
router.post("/:name/disable", validateService, ctrl.serviceAction("disable"));

export default router;