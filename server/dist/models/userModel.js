"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
class userModel extends sequelize_1.Model {
}
exports.userModel = userModel;
userModel.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: _1.sequelize,
    tableName: "users",
});
//# sourceMappingURL=userModel.js.map