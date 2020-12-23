import express from "express";
import {
    renterLoginController,
    renterRegisterController,
    hostLoginController,
    hostRegisterController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/renter/login", renterLoginController);

router.post("/renter/register", renterRegisterController);

router.post("/host/login", hostLoginController);

router.post("/host/register", hostRegisterController);

export default router;
