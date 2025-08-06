import { Router } from "express";
import {
  addTest,
  getAllTests,
  getTest,
  updateTest,
} from "../controllers/testController.js";

const router = Router();

router.get("/:userId", getAllTests); // get all tests by user
router.get("/:id", getTest); // get test by report
router.post("/:id", addTest); // add test by report
router.put("/:id", updateTest); // update test by test id

export default router;
