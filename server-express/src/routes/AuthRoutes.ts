import { Router } from "express";
import AuthController from "../http/controllers/AuthController";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);

export default authRoutes;
