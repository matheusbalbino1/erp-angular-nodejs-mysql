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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const child_process_1 = __importDefault(require("child_process"));
exports.sequelize = new sequelize_1.Sequelize("erp", "root", "password", {
    dialect: "mysql",
    host: "database",
});
const authenticate = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.sequelize.authenticate();
        child_process_1.default.exec("sequelize db:migrate", (error) => {
            if (error) {
                console.log("######################################################");
                console.log(error);
                console.error("Migrations not performed!");
                return;
            }
            console.log("Migrations performed!");
        });
    }
    catch (err) {
        setTimeout(() => {
            console.log("Try to reconnect to the database...");
            authenticate();
        }, 10000);
    }
});
authenticate();
//# sourceMappingURL=index.js.map