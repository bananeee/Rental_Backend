import express from "express";
const router = express.Router();

import { getHostsController } from "../controllers/host.controller.js";
import { verifyToken, requireLogin } from "../middlewares/auth.middleware.js";

router.get("/",verifyToken, requireLogin, getHostsController);

export default router;