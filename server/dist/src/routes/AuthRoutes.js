"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../http/controllers/AuthController"));
const authRoutes = (0, express_1.Router)();
const authController = new AuthController_1.default();
authRoutes.post("/login", authController.login);
authRoutes.post("/logout", authController.logout);
exports.default = authRoutes;
//# sourceMappingURL=AuthRoutes.js.map