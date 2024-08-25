import { Schema } from "mongoose";

const mongoose = require("mongoose");

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  players: Array<Schema.Types.ObjectId>;
}

const UserSchema = new Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
});

export default mongoose.model("User", UserSchema);
