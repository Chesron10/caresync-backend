import { Router } from "express";
import {
  createUser,
  deleteUser,
  updateUser,
  getUser,
} from "../controllers/userController.js";

const router = Router();

router.get("/:code", getUser); // get user by code
router.post("/", createUser); // add user
router.put("/:id", updateUser); // update user
router.delete("/:id", deleteUser); // delete user

export default router;
