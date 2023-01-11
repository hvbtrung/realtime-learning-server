const questionVoteService = require("../services/questionVoteService");

module.exports = {
  save: async (req, res) => {
    const { questionId, votingType } = req.body.data;

    const isVoted = await questionVoteService.getVote({
      voter: req.user._id,
      questionId,
      votingType,
    });

    let result = null;
    if (isVoted) {
      result = await questionVoteService.update({
        voter: req.user._id,
        questionId,
        votingType,
      });
    } else {
      result = await questionVoteService.save({
        questionId: questionId,
        votingType,
        voter: req.user._id,
      });
    }

    if (result.status == "success") {
      return res.status(200).json({
        status: result.status,
        message: result.message,
      });
    }
    return res.json({
      status: result.status,
      message: result.message,
    });
  },

  update: async (req, res) => {
    const { questionId, votingType } = req.body;

    const result = await questionVoteService.update({
      questionId: questionId,
      votingType,
      voter: req.user._id,
    });

    if (result.status == "success") {
      return res.status(200).json({
        status: result.status,
        message: result.message,
      });
    }
    return res.json({
      status: result.status,
      message: result.message,
    });
  },

  getVote: async (req, res) => {
    const { questionId, votingType } = req.query;

    let result = null;

    result = await questionVoteService.getVote({
      questionId: questionId,
      votingType,
      voter: req.user._id,
    });

    if (result.status == "success") {
      return res.status(200).json({
        status: result.status,
        message: result.message,
        vote: result.vote,
      });
    }
    return res.json({
      status: result.status,
      message: result.message,
    });
  },
};
