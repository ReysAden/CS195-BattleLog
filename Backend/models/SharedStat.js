const mongoose = require("mongoose");

const SharedStatSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    deckName: {
      type: String,
      required: true,
    },
    totalGames: {
      type: Number,
      required: true,
    },
    firstGames: {
      type: Number,
      required: true,
    },
    secondGames: {
      type: Number,
      required: true,
    },
    firstWins: {
      type: Number,
      required: true,
    },
    secondWins: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const SharedStat = mongoose.model("SharedStat", SharedStatSchema);
module.exports = SharedStat;
