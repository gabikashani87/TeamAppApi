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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = new User_1.default(userData);
    let result = yield createdUser.save();
    return result;
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    email = email.toLowerCase();
    try {
        const user = yield User_1.default.findOne({ email });
        if (user) {
            return res.status(400).json({ message: `user already exist` });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        let userData = req.body;
        userData.password = hashedPassword;
        return res.status(200).json({ message: yield addUser(userData) });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    try {
        email = email.toLowerCase();
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: `Invalid Cradentials` });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: `Invalid Cradentials` });
        }
        const token = jsonwebtoken_1.default.sign(user.id, "somesecret");
        return res.status(200).json({ token });
    }
    catch (err) {
        return res.status(500).send(err);
    }
});
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.body.user).select("-password");
        if (!user) {
            return res.status(400).json({ errors: { msg: "No User Found" } });
        }
        return res.status(200).json(user);
    }
    catch (err) {
        return res.status(500).send("Server Error");
    }
});
const userController = {
    authUser,
    registerUser,
    loginUser,
};
exports.default = userController;
// module.exports.authUser = authUser;
// module.exports.registerUser =registerUser;
// module.exports.loginUser =loginUser;
//# sourceMappingURL=userController.js.map