import express from "express";
import { renterLoginController, renterRegisterController } from "../controllers/renter.controller.js";

const router = express.Router();

router.post("/renter/login", renterLoginController);

router.post("/renter/register", renterRegisterController);

router.post("/host/register");

router.post("/host/register");

export default router;