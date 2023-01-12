const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    asker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    presentationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    isAnswered: {
      type: Boolean,
    },
  },
  {
    timestamps: { type: Number, default: new Date().getTime() },
  }
);

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
