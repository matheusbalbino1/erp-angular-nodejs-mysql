"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../http/controllers/UserController"));
const userRoutes = (0, express_1.Router)();
const userControllers = new UserController_1.default();
userRoutes.get("/", userControllers.index);
userRoutes.post("/", userControllers.create);
userRoutes.get("/:id", userControllers.show);
userRoutes.put("/:id", userControllers.update);
userRoutes.delete("/:id", userControllers.delete);
exports.default = userRoutes;
//# sourceMappingURL=userRoutes.js.map