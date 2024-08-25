import Player from "../models/Player";
import { Request, Response } from "express";

interface PlayerData {
  name: string;
  rank: number;
}

const addPlayerToDB = async (playerData: PlayerData) => {
  const createdPlayer = new Player(playerData);

  let result = await createdPlayer.save();
  return result;
};

const addPlayer = async (req: Request, res: Response) => {
  debugger;
  try {
    let playerData: PlayerData = req.body;
    return res.status(200).json({ message: await addPlayerToDB(playerData) });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const playerController = {
  addPlayer,
};

export default playerController;
