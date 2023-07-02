"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const AuthRoutes_1 = __importDefault(require("./AuthRoutes"));
const ProductsRoutes_1 = __importDefault(require("./ProductsRoutes"));
const UserController_1 = __importDefault(require("../http/controllers/UserController"));
const jwt_1 = require("../utils/jwt");
const router = (0, express_1.Router)();
const userControllers = new UserController_1.default();
router.use("/auth", AuthRoutes_1.default);
router.post("/user", userControllers.create);
router.use("/user", jwt_1.verifyToken, userRoutes_1.default);
router.use("/products", jwt_1.verifyToken, ProductsRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map