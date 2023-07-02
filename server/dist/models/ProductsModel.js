"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class productsModel extends sequelize_1.Model {
}
exports.productsModel = productsModel;
productsModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: _1.sequelize,
    tableName: "products",
});
//# sourceMappingURL=ProductsModel.js.map