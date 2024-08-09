"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const url = "mongodb+srv://gabikashani1:i6pmGjD7PWohVCx7@teamapp.pq6eg.mongodb.net/team-app?retryWrites=true&w=majority&appName=TeamApp";
mongoose_1.default
    .connect(url)
    .then(() => {
    console.log("DB connected");
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=mongoose.js.map