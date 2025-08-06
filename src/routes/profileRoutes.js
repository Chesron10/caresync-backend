import { Router } from "express";
import {
  addProfile,
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";

const router = Router();

router.get("/:id", getProfile); // get profile by user
router.post("/:id", addProfile); // add profile by user
router.put("/:id", updateProfile); // update profile

export default router;
