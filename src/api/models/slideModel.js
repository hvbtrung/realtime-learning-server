const mongoose = require("mongoose");

const slideSchema = new mongoose.Schema(
  {
    presentationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Presentation",
    },
    type: {
      type: String, // MultipleChoice, Paragraph, Heading
      require: true,
    },
    question: {
      type: String,
    },
    options: {
      type: [Object],
    },
    heading: {
      type: String,
    },
    paragraph: {
      type: String,
    },
    subHeading: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Slide = mongoose.model("Slide", slideSchema);

module.exports = Slide;
