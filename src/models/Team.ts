import { Schema } from "mongoose";

const mongoose = require("mongoose");

export interface ITeam {
  players: Array<Schema.Types.ObjectId>;
}

const TeamSchema = new Schema<ITeam>({
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

export default mongoose.model("Team", TeamSchema);
