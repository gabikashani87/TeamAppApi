"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const route = express_1.default.Router();
const auth_1 = __importDefault(require("../auth/auth"));
const userController_1 = __importDefault(require("../controllers/userController"));
const { authUser, registerUser, loginUser } = userController_1.default;
route.route("/register").post((req, res, next) => {
    console.log("middleware");
    next();
}, registerUser);
route.route("/login").post((req, res, next) => {
    console.log("middleware");
    next();
}, loginUser);
route.route("/load").get(auth_1.default, authUser);
exports.default = route;
//# sourceMappingURL=userRoute.js.map