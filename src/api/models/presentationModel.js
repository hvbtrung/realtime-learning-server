const mongoose = require("mongoose");

const presentationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: 100,
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: { type: Number, default: new Date().getTime() },
  }
);

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
