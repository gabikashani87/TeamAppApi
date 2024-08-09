import express from "express";
const route = express.Router();
import auth from "../auth/auth";

import userController from "../controllers/userController";
const { authUser, registerUser, loginUser } = userController;

route.route("/register").post((req, res, next) => {
  console.log("middleware");
  next();
}, registerUser);

route.route("/login").post((req, res, next) => {
  console.log("middleware");
  next();
}, loginUser);

route.route("/load").get(auth, authUser);

export default route;
