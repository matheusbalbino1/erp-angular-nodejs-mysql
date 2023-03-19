import { Router } from "express";
import UserControllers from "../http/controllers/UserController";

const userRoutes = Router();
const userControllers = new UserControllers();

userRoutes.get("/user", userControllers.index);
userRoutes.post("/user", userControllers.create);
userRoutes.get("/user/:id", userControllers.show);
userRoutes.put("/user/:id", userControllers.update);
userRoutes.delete("/user/:id", userControllers.delete);

export default userRoutes;
