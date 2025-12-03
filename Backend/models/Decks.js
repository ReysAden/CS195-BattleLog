const mongoose = require("mongoose");

// TODO: Define your Task schema here
const DeckSchema = new mongoose.Schema(
  {
    //username 
    DeckName: {
      type: String,
      required: true,
      trim: true,
    }
  },
  {
    timestamps: true,
  }
);

const Decks = mongoose.model("Decks", DeckSchema);
module.exports = Decks;
