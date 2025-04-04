import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/create", UserController.createUser);
router.get("/all", authenticate, UserController.getAllUsers);
router.get("/:id", authenticate, UserController.getUserById);

export default router;
