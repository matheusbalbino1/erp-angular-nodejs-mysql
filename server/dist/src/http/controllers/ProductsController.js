"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProductsModel_1 = require("../../../models/ProductsModel");
class ProductsController {
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize, orderBy } = request.query;
            const offset = (page - 1) * pageSize;
            try {
                const { count, rows } = yield ProductsModel_1.productsModel.findAndCountAll({
                    limit: pageSize,
                    offset,
                    order: [orderBy || ["id", "ASC"]],
                });
                return response.status(200).json({
                    status: "sucess",
                    data: rows,
                    meta: { count, page, pageSize },
                });
            }
            catch (error) {
                response
                    .status(400)
                    .json({ status: "error", message: (error === null || error === void 0 ? void 0 : error.message) || error });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created_product = yield ProductsModel_1.productsModel.findOrCreate({
                    where: { name: request.body.name },
                    defaults: {
                        name: request.body.name,
                    },
                });
                if (!created_product[1])
                    throw new Error("Product already exists!");
                response
                    .status(200)
                    .json({ status: "sucess", message: created_product[0] });
            }
            catch (error) {
                response
                    .status(400)
                    .json({ status: "error", message: (error === null || error === void 0 ? void 0 : error.message) || error });
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [numRowsUpdated, [updated_product]] = yield ProductsModel_1.productsModel.update({ name: request.body.name }, { where: { id: request.params.id }, returning: true });
                if (!numRowsUpdated)
                    throw new Error("Product not found!");
                response.status(200).json({ status: "sucess", message: updated_product });
            }
            catch (error) {
                response
                    .status(400)
                    .json({ status: "error", message: (error === null || error === void 0 ? void 0 : error.message) || error });
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numDeletedRows = yield ProductsModel_1.productsModel.destroy({
                    where: { id: request.params.id },
                });
                if (!numDeletedRows)
                    throw new Error("Product not found!");
                response
                    .status(200)
                    .json({ status: "sucess", message: "Product deleted successfully!" });
            }
            catch (error) {
                response
                    .status(400)
                    .json({ status: "error", message: (error === null || error === void 0 ? void 0 : error.message) || error });
            }
        });
    }
}
exports.default = ProductsController;
//# sourceMappingURL=ProductsController.js.map