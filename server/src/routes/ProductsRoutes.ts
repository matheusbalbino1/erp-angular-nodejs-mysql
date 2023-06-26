import { Router } from "express";
import ProductsController from "../http/controllers/ProductsController";

const productsRoutes = Router();
const productsController = new ProductsController();

productsRoutes.get("/", productsController.show);
productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/id", productsController.delete);

export default productsRoutes;
