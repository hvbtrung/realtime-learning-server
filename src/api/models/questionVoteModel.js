const mongoose = require("mongoose");

const questionVote = new mongoose.Schema({
  voter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    require: true,
  },
  votingType: {
    type: String,
    require: true,
  },
});

const QuestionVote = mongoose.model("QuestionVote", questionVote);

module.exports = QuestionVote;
