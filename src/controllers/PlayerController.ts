import Player, { IPlayer } from "../models/Player";

const addPlayerToDB = async (playerData: IPlayer) => {
  const createdPlayer = new Player(playerData);
  debugger;
  let result = await createdPlayer.save();
  return result;
};

const playerController = {
  addPlayerToDB,
};

export default playerController;
