import { Router } from "express";

const router = Router();

router.get("/"); // get all health tips
router.get("/:id"); // get health tips by id
router.post("/:id"); // add health tip by doctor id
router.put("/:id"); // update health tip by id
router.delete("/:id"); // delete health tip by id
router.post("/likes/:id"); // like or unlike health tip by tip id
router.post("/comments/:id"); // comment on health tip by id
router.put("/comments/:id"); // update comment by id
router.delete("/comments/:id"); // delete comment by id
router.post("/commentLikes/:id"); // like or dislike comments
