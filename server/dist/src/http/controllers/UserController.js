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
const userModel_1 = require("../../../models/userModel");
class UserControllers {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.userModel.findAll();
                response.status(200).json({ status: "sucess", message: users });
            }
            catch (error) {
                response.status(404).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const created_user = yield userModel_1.userModel.findOrCreate({
                    where: { username: request.body.username },
                    defaults: {
                        username: request.body.username,
                        password: request.body.password,
                    },
                });
                if (!created_user[1])
                    throw new Error("User already exists!");
                response.status(200).json({ status: "sucess", message: created_user[0] });
            }
            catch (error) {
                response.status(400).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const found_user = yield userModel_1.userModel.findOne({
                    where: { id: request.params.id },
                });
                if (!found_user)
                    throw new Error("User not found!");
                response.status(200).json({ status: "sucess", message: found_user });
            }
            catch (error) {
                response.status(404).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    update(request, response) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_user = yield userModel_1.userModel.findOne({
                    where: { id: request.params.id },
                });
                if (!find_user)
                    throw new Error("User not found!");
                yield userModel_1.userModel.update({ username: (_a = request.body) === null || _a === void 0 ? void 0 : _a.username, password: (_b = request.body) === null || _b === void 0 ? void 0 : _b.password }, { where: { id: request.params.id } });
                const updated_user = yield userModel_1.userModel.findOne({
                    where: { id: request.params.id },
                });
                response.status(200).json({ status: "sucess", message: updated_user });
            }
            catch (error) {
                response.status(400).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find_user = yield userModel_1.userModel.findOne({
                    where: { id: request.params.id },
                });
                if (!find_user)
                    throw new Error("User not found!");
                yield userModel_1.userModel.destroy({ where: { id: request.params.id } });
                response.status(200).json({ status: "sucess" });
            }
            catch (error) {
                response.status(400).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
            }
        });
    }
}
exports.default = UserControllers;
//# sourceMappingURL=UserController.js.map