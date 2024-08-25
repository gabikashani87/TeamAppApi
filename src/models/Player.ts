const mongoose = require("mongoose");

let PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rank: { type: Number, required: true },
});

export default mongoose.model("Player", PlayerSchema);
