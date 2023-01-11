const mongoose = require("mongoose");
const questionVoteSchema = require("../models/questionVoteModel");

module.exports = {
  getVote: async ({ voter, questionId }) => {
    try {
      const result = await questionVoteSchema.findOne({ voter, questionId });

      if (result) {
        return {
          status: "success",
          message: "Get vote successfully",
          vote: result,
        };
      }
      return false;
    } catch (e) {
      console.Error("Add collaborator error", e);
      return { status: "error", message: "Get vote failure" };
    }
  },

  save: async ({ voter, questionId, votingType }) => {
    try {
      console.log("value: ", voter, questionId, votingType);

      const isExist = await questionVoteSchema.findOne({
        voter: voter,
        questionId: mongoose.Types.ObjectId(questionId),
      });

      // console.log("isExist: ", isExist);

      // if (isExist) {
      //   return { status: "error", message: "User has been voted" };
      // }
      var newQuestionVote = new questionVoteSchema({
        voter,
        questionId: mongoose.Types.ObjectId(questionId),
        votingType,
      });

      const result = await newQuestionVote.save();

      if (result) {
        return { status: "success", message: "Adding a question vote success" };
      }

      return false;
    } catch (e) {
      console.Error("Add collaborator error", e);
      return { status: "error", message: "Adding a question vote failure" };
    }
  },

  update: async ({ voter, questionId, votingType }) => {
    try {
      // const filter = { owner: userId, _id: presentationId };
      const filter = { questionId: mongoose.Types.ObjectId(questionId), voter };
      const updated = { votingType: votingType };
      await questionVoteSchema.findOneAndUpdate(filter, updated);

      return {
        status: "success",
        message: "Updating a question vote  success",
      };
    } catch (e) {
      console.error("Updating's error", e);
      return { status: "error", message: "Updating a question vote failed" };
    }
  },

  delete: async ({ voter, questionId }) => {
    try {
      const filter = {
        voter,
        questionId: mongoose.Types.ObjectId(questionId),
      };

      await questionVoteSchema.findOneAndDelete(filter);

      return { status: "success", message: "Deleting question vote success" };
    } catch (e) {
      console.Error(e);
      return { status: "error", message: e };
    }
  },

  countByQuestionId: async ({ questionId, votingType }) => {
    try {
      var results = await questionVoteSchema.find({
        questionId: mongoose.Types.ObjectId(questionId),
        votingType,
      });

      return {
        status: "success",
        message: "count total vote successfully",
        count: results.length,
      };
    } catch (err) {
      console.Error(e);
      return { status: "error", message: e };
    }
  },
};
