import { Schema } from "mongoose";

const mongoose = require("mongoose");

export interface ITeam {
  players: Array<Schema.Types.ObjectId>;
  user: Schema.Types.ObjectId;
  createdAt: Date;
  wasPlayed: Boolean;
}

const TeamSchema = new Schema<ITeam>({
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  user: { type: Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  wasPlayed: { type: Boolean, default: false },
});

export default mongoose.model("Team", TeamSchema);
