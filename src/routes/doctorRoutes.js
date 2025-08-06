import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  getAccount,
  updateAccount,
} from "../controllers/doctorController.js";

const router = Router();

router.get("/:id", getAccount); // get doctor by id
router.post("/", createAccount); // create doctor
router.put("/:id", updateAccount); // update doctor
router.delete("/:id", deleteAccount); // delete doctor

export default router;
