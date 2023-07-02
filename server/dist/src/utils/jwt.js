"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ASSIGN_JWT = process.env.ASSIGN_JWT || "password";
function verifyToken(req, res, next) {
    try {
        const bearerHeader = req.headers["authorization"];
        const bearerToken = bearerHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(bearerToken, ASSIGN_JWT, (err, authData) => {
            if (err)
                return res
                    .status(401)
                    .json({
                    status: "error",
                    message: "The token is invalid",
                })
                    .end();
            req.userId = authData.id;
            next();
        });
    }
    catch (err) {
        res
            .status(403)
            .json({
            status: "error",
            message: "The 'authorization' is missing",
        })
            .end();
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map