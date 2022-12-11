const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema(
  {
    context: {
      type: String,
    },
    description: {
      type: String,
    },
    question: {
      type: String,
    },
    options: {
      type: Object,
    },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SlideType",
    },
    presentationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
    },
  },
  {
    timestamps: true,
  }
);

const Slide = mongoose.model("Slide", slideSchema);

module.exports = Slide;
