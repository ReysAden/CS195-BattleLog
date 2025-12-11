const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    yourDeck: {
      type: String,
      required: true,
    },
    oppDeck: {
      type: String,
      required: true,
    },
    firstSecond: {
      type: String,
      required: true,
      enum: ['first', 'second']
    },
    result: {
      type: String,
      required: true,
      enum: ['win', 'loss']
    }
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", GameSchema);
module.exports = Game;
