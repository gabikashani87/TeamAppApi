import { Schema } from "mongoose";

const mongoose = require("mongoose");

export interface IPlayer {
  name: string;
  rank: number;
  user: Schema.Types.ObjectId;
}

const PlayerSchema = new Schema<IPlayer>({
  name: { type: String, required: true },
  rank: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Player", PlayerSchema);
