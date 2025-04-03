import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/all", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

export default router;
