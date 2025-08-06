import { Router } from "express";
import {
  addReport,
  getAllReport,
  getReport,
  updateReport,
} from "../controllers/reportController.js";

const router = Router();

router.get("/:id", getAllReport); // get all reports by user
router.get("/:reportId", getReport); // get report by id
router.post("/:id", addReport); // add report by user
router.put("/:id", updateReport); // update report

export default router;
