const presentationSchema = require("../models/presentationModel");
const mongoose = require("mongoose");

module.exports = {
  getPresentationsByUserId: async ({ userId }) => {
    try {
      // userId = mongoose.Types.ObjectId(userId);
      const results = await presentationSchema
        .find({ userId })
        .populate({ path: "owner", select: "name" });

      return { status: "success", presentations: results };
    } catch (e) {
      console.error("Get presentations error", e);
      return { status: "error", message: e };
    }
  },

  save: async ({ userId, titlePresentation }) => {
    try {
      var newPresentation = new presentationSchema({
        owner: userId,
        title: titlePresentation,
      });

      await newPresentation.save();

      return {
        status: "success",
        message: "Creating a new presentation success",
      };
    } catch (e) {
      console.error("Creating's error", e);

      return {
        status: "error",
        message: "Creating a new presentation failed",
      };
    }
  },

  update: async ({ userId, presentationId, titlePresentation }) => {
    try {
      const filter = { owner: userId, _id: presentationId };
      const updated = { title: titlePresentation };
      await presentationSchema.findOneAndUpdate(filter, updated);

      return { status: "success", message: "Updating a presentation success" };
    } catch (e) {
      console.error("Updating's error", e);
      return { status: "error", message: "Updating a presentation failed" };
    }
  },

  delete: async ({ presentationId, userId }) => {
    try {
      const filter = {
        owner: userId,
        _id: presentationId,
      };

      const a = await presentationSchema.findOneAndDelete(filter);

      return { status: "success", message: "Deleting a presentation success" };
    } catch (e) {
      console.error("Deleting's error", e);
      return { status: "error", message: "Deleting a presentation failed" };
    }
  },
};
