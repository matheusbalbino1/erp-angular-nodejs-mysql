"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = __importDefault(require("../http/controllers/ProductsController"));
const productsRoutes = (0, express_1.Router)();
const productsController = new ProductsController_1.default();
productsRoutes.get("/", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/id", productsController.delete);
exports.default = productsRoutes;
//# sourceMappingURL=ProductsRoutes.js.map