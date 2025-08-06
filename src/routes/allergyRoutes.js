import { Router } from "express";
import {
  addAllergy,
  deleteAllergy,
  getAllergy,
  updateAllergy,
} from "../controllers/allergyController.js";

const router = Router();

router.get("/:id", getAllergy); // get allergy by user
router.post("/:id", addAllergy); // add allergy by user
router.put("/:id", updateAllergy); // update allergy
router.delete("/:id", deleteAllergy); // delete allergy

export default router;
