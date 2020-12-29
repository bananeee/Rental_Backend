import express from "express";

import { getHostController, updateHostInfoController } from "../controllers/host.controller.js";
import { verifyToken, requireLogin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/:id", verifyToken, requireLogin, getHostController)
router.put("/:id", verifyToken, requireLogin, updateHostInfoController)

export default router;
