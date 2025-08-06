import { Router } from "express";
import { getOtc } from "../controllers/utilController.js";

const router = Router();

router.get("/otc/:id", getOtc);
// router.get("/otp/:id");

export default router;
