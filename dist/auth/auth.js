"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.header("x-auth-token");
    //Check if there is a token
    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token, auth denied" }] });
    }
    //Verfiy token
    const decoded = jsonwebtoken_1.default.verify(token, "somesecret");
    if (!decoded) {
        return res
            .status(401)
            .json({ errors: [{ msg: "Verify failed, auth denied" }] });
    }
    req.body.user = decoded;
    next();
};
exports.default = auth;
//# sourceMappingURL=auth.js.map