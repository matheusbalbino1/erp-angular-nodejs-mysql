import { Request, Response } from "express";
import { IUserCreate } from "../interfaces/IUser";
import {
  IProductDelete,
  IProductPagination,
  IProductUpdate,
  IProductsCreate,
} from "../interfaces/IProducts";
import { productsModel } from "../../../models/ProductsModel";

class ProductsController {
  async show(
    request: Request<{}, {}, {}, IProductPagination>,
    response: Response
  ) {
    const { page, pageSize, orderBy } = request.query;
    const offset = (page - 1) * pageSize;
    try {
      const { count, rows } = await productsModel.findAndCountAll({
        limit: pageSize,
        offset,
        order: [orderBy || ["id", "ASC"]],
      });

      return response.status(200).json({
        status: "sucess",
        data: rows,
        meta: { count, page, pageSize },
      });
    } catch (error) {
      response
        .status(400)
        .json({ status: "error", message: error?.message || error });
    }
  }

  async create(request: Request<{}, {}, IProductsCreate>, response: Response) {
    try {
      const created_product = await productsModel.findOrCreate({
        where: { name: request.body.name },
        defaults: {
          name: request.body.name,
        },
      });

      if (!created_product[1]) throw new Error("Product already exists!");

      response
        .status(200)
        .json({ status: "sucess", message: created_product[0] });
    } catch (error) {
      response
        .status(400)
        .json({ status: "error", message: error?.message || error });
    }
  }
  async update(
    request: Request<IProductUpdate, {}, IProductsCreate>,
    response: Response
  ) {
    try {
      const [numRowsUpdated, [updated_product]] = await productsModel.update(
        { name: request.body.name },
        { where: { id: request.params.id }, returning: true }
      );

      if (!numRowsUpdated) throw new Error("Product not found!");

      response.status(200).json({ status: "sucess", message: updated_product });
    } catch (error) {
      response
        .status(400)
        .json({ status: "error", message: error?.message || error });
    }
  }
  async delete(request: Request<IProductDelete>, response: Response) {
    try {
      const numDeletedRows = await productsModel.destroy({
        where: { id: request.params.id },
      });
      if (!numDeletedRows) throw new Error("Product not found!");
      response
        .status(200)
        .json({ status: "sucess", message: "Product deleted successfully!" });
    } catch (error) {
      response
        .status(400)
        .json({ status: "error", message: error?.message || error });
    }
  }
}

export default ProductsController;
