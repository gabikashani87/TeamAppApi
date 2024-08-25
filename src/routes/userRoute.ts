import express from "express";
const route = express.Router();
import auth from "../auth/auth";

import userController from "../controllers/userController";
const { authUser, registerUser, loginUser, getUserPlayers, addPlayer } =
  userController;

route.route("/register").post((req, res, next) => {
  console.log("middleware");
  next();
}, registerUser);

route.route("/login").post((req, res, next) => {
  console.log("middleware");
  next();
}, loginUser);

route.route("/:userID/players").get((req, res, next) => {
  console.log("middleware");
  next();
}, getUserPlayers);

route.route("/:userID/player").post((req, res, next) => {
  debugger;
  console.log("middleware");
  next();
}, addPlayer);

route.route("/load").get(auth, authUser);

export default route;
