import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./AuthRoutes";
import UserControllers from "../http/controllers/UserController";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const router = Router();
const userControllers = new UserControllers();

router.use("/auth", authRoutes);
router.post("/user", userControllers.create);
router.use("/user", verifyToken, userRoutes);

export default router;
