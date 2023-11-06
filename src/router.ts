import { Router } from "express";
import userController from "./constrollers";

export const router = Router();

router.get("/users", userController.getUsers);

export default router;
