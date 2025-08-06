import { Router } from "express";
import {
  addPrescription,
  deletePrescription,
  getAllPrescriptions,
  getPrescription,
  updatePrescription,
} from "../controllers/prescriptionController.js";

const router = Router();

router.get("/all/:id", getAllPrescriptions); // get prescription by report
router.get("/:id", getPrescription); //get prescription by id
router.post("/:id", addPrescription); // add prescription by report
router.put("/:id", updatePrescription); // update prescription
router.delete("/:id", deletePrescription); // delete prescription

export default router;
