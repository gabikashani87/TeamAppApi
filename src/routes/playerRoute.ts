import express from "express";
const route = express.Router();

import playerController from "../controllers/PlayerController";

const { addPlayer } = playerController;

route.route("/add-player").post((req, res, next) => {
  debugger;
  console.log("middleware");
  next();
}, addPlayer);

export default route;
