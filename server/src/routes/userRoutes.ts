import { Router } from "express";
import UserControllers from "../http/controllers/UserController";

const userRoutes = Router();
const userControllers = new UserControllers();

userRoutes.get("/", userControllers.index);
userRoutes.post("/", userControllers.create);
userRoutes.get("/:id", userControllers.show);
userRoutes.put("/:id", userControllers.update);
userRoutes.delete("/:id", userControllers.delete);

export default userRoutes;
