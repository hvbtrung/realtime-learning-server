const mongoose = require("mongoose");
const Message = require("../models/messageModel");

module.exports = {
  save: async ({ sender, presentationId, message }) => {
    try {
      var newMessage = new Message({
        sender: sender,
        presentationId: mongoose.Types.ObjectId(presentationId),
        message: message,
      });

      const result = await newMessage.save();

      if (result) {
        return { status: "success", message: "Save message success" };
      }

      throw Error;
    } catch (e) {
      console.Error("Save message error", e);
      return { status: "error", message: "Save message failure" };
    }
  },

  getAll: async ({ presentationId }) => {
    try {
      var results = await Message.find({
        presentationId: presentationId,
      }).populate({ path: "sender", select: "name" });

      console.log(results);
      return { status: "success", messages: results };
    } catch (err) {
      console.error(e);
      return { status: "error", message: e };
    }
  },
};
