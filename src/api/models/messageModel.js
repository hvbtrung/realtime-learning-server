const mongoose = require("mongoose");

const message = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  presentationId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Presentation",
  },
  message: {
    type: String,
    require: true,
  },
});

const Message = mongoose.model("Message", message);

module.exports = Message;
