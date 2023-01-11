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
        return {
          status: "success",
          message: "Save message success",
        };
      }

      throw Error;
    } catch (e) {
      console.Error("Save message error", e);
      return { status: "error", message: "Save message failure" };
    }
  },

  delete: async ({ presentationId }) => {
    try {
      const filter = {
        presentationId: presentationId,
      };

      await Message.findOneAndDelete(filter);

      return { status: "success", message: "delete message success" };
    } catch (e) {
      console.Error(e);
      return { status: "error", message: e };
    }
  },

  getAll: async ({ presentationId }) => {
    try {
      var results = await Message.find({
        presentationId: presentationId,
      }).populate({ path: "sender", select: "name" });

      return { status: "success", messages: results };
    } catch (err) {
      console.Error(e);
      return { status: "error", message: e };
    }
  },
};
