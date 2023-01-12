const mongoose = require("mongoose");

const userPresentation = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  presentationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Presentation",
  },
  role: {
    type: String,
    default: "sharedwithme",
  },
});

const UserPresentation = mongoose.model("UserPresentation", userPresentation);

module.exports = UserPresentation;
