const mongoose = require("mongoose");
const presentationSchema = require("../models/presentationModel");
const questionSchema = require("../models/questionModel");
const questionVoteService = require("../services/questionVoteService");
const UserPresentation = require("../models/userPresentationModel");

module.exports = {
  save: async ({ asker, presentationId, content }) => {
    try {
      var newQuestion = new questionSchema({
        asker,
        presentationId: mongoose.Types.ObjectId(presentationId),
        content,
      });

      const result = await newQuestion.save();

      question = { ...result._doc, totalVotes: "0" };

      if (result) {
        return {
          status: "success",
          message: "Adding a question success",
          question: question,
        };
      }

      return false;
    } catch (e) {
      console.error("Add collaborator error", e);
      return { status: "error", message: "Adding a question failure" };
    }
  },

  updateMarkQuestion: async ({
    asker,
    questionId,
    isAnswered,
    presentationId,
  }) => {
    console.log(
      "questionId, isAnswered, presentationId",
      questionId,
      isAnswered,
      presentationId
    );

    try {
      let isOwner = await presentationSchema.findOne({
        owner: asker,
        _id: presentationId,
      });

      let isCoOwner = await UserPresentation.findOne({
        userId: asker,
        presentationId: mongoose.Types.ObjectId(presentationId),
      });

      // console.log("is Owner 02: ", isOwner, isCoOwner);
      if (!isOwner && !isCoOwner) {
        return { status: "error", message: "Update Mark Question Falure" };
      }

      const filter = { questionId: mongoose.Types.ObjectId(questionId), asker };
      const updated = { isAnswered: isAnswered };

      const result = await questionSchema.findOneAndUpdate(filter, updated);
      questionSchema.deleteOne(result);
      result.save();
      console.log("result:", result);
      if (result) {
        return {
          status: "success",
          message: "Update Mark Question Success",
        };
      }

      return { status: "error", message: "Update Mark Question Falure" };
    } catch (e) {
      return { status: "error", message: "Update Mark Question Falure" };
    }
  },

  delete: async ({ presentationId }) => {
    try {
      const filter = {
        presentationId: presentationId,
      };

      await questionSchema.findOneAndDelete(filter);

      return { status: "success", message: "Deleting question success" };
    } catch (e) {
      console.error(e);
      return { status: "error", message: e };
    }
  },

  getAll: async ({ presentationId }) => {
    try {
      let results = await questionSchema
        .find({
          presentationId: mongoose.Types.ObjectId(presentationId),
        })
        .populate({ path: "asker", select: "name" });

      let questions = [];

      for (let question of results) {
        let upVote = await questionVoteService.countByQuestionId({
          questionId: question._id,
          votingType: "up_vote",
        });
        let downVote = await questionVoteService.countByQuestionId({
          questionId: question._id,
          votingType: "down_vote",
        });

        questions.push({
          ...question._doc,
          totalVotes: upVote.count - downVote.count,
        });
      }
      return { status: "success", questions: questions };
    } catch (err) {
      console.error(e);
      return { status: "error", message: e };
    }
  },
};
