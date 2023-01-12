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
    isPresent: {
      type: Boolean,
      default: false
    },
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: { type: Number, default: new Date().getTime() },
  }
);

const Presentation = mongoose.model("Presentation", presentationSchema);

module.exports = Presentation;
