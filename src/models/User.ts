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

// Define virtuals for firstName and lastName
UserSchema.virtual("firstName")
  .get(function () {
    return this.first_name;
  })
  .set(function (value) {
    this.first_name = value;
  });

UserSchema.virtual("lastName")
  .get(function () {
    return this.last_name;
  })
  .set(function (value) {
    this.last_name = value;
  });

// Ensure virtuals are included in JSON responses
UserSchema.set("toJSON", { virtuals: true });
UserSchema.set("toObject", { virtuals: true });

export default mongoose.model("User", UserSchema);
