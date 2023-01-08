const UserPresentation = require("../models/userPresentationModel");
const mongoose = require("mongoose");
const User = require("../models/userModel");

module.exports = {
  save: async ({ email, presentationId, role }) => {
    try {
      var user = await User.findOne({
        email: email,
      });

      if (!user) {
        return {
          status: "error",
          message: "The email that you typed is invalid",
        };
      }

      var isExist = await UserPresentation.find({
        userId: user._id,
      });

      if (isExist) {
        return {
          status: "error",
          message: "The member is already exist",
        };
      }

      var newSharedPresentation = new UserPresentation({
        userId: user._id,
        presentationId: mongoose.Types.ObjectId(presentationId),
        role: role,
      });

      const result = await newSharedPresentation.save();

      if (result) {
        return { status: "success", message: "Adding a collaborator success" };
      }

      return false;
    } catch (e) {
      console.Error("Add collaborator error", e);
      return { status: "error", message: "Adding a collaborator failure" };
    }
  },

  getAll: async ({ userId }) => {
    try {
      var results = await UserPresentation.find({
        userId,
      }).populate("presentationId");

      var presentations = [];

      for (var presentation of results) {
        var owner = await User.findOne({
          _id: presentation.presentationId.owner,
        });

        var item = {
          _id: presentation.presentationId._id,
          title: presentation.presentationId.title,
          owner: {
            name: owner.name,
          },
          createdAt: presentation.presentationId.createdAt,
          updatedAt: presentation.presentationId.updatedAt,
        };

        presentations.push(item);
      }

      return { status: "success", presentations: presentations };
    } catch (err) {
      console.error(e);
      return { status: "error", message: e };
    }
  },
};
