"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class storageModel extends sequelize_1.Model {
}
exports.storageModel = storageModel;
storageModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "products",
            key: "id",
        },
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    created_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
}, {
    sequelize: _1.sequelize,
    tableName: "storage",
});
//# sourceMappingURL=StorageModel.js.map