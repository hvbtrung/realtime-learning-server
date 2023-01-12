const questionService = require("../services/questionService");

module.exports = {
  getAll: async (req, res) => {
    let results = null;

    const { presentationId } = req.query;

    results = await questionService.getAll({ presentationId: presentationId });

    if (results.status == "success") {
      return res.status(200).json({
        status: results.status,
        questions: results.questions,
      });
    }
    return res.json({
      status: results.status,
      message: results.message,
    });
  },

  save: async (req, res) => {
    const { content, presentationId } = req.body.data;

    let result = null;
    result = await questionService.save({
      asker: req.user._id,
      presentationId: presentationId,
      content: content,
    });

    console.log("result: ", result);

    if (result.status == "success") {
      return res.status(200).json({
        status: result.status,
        message: result.message,
        question: result.question,
      });
    }

    return res.json({
      status: result.status,
      message: result.message,
    });
  },

  markQuestion: async (req, res) => {
    const { questionId, isAnswered, presentationId } = req.body.data;

    let result = null;
    result = await questionService.updateMarkQuestion({
      asker: req.user._id,
      questionId,
      presentationId,
      isAnswered: isAnswered !== "true",
    });

    console.log("markQuestion: ", result);

    if (result.status == "success") {
      return res.status(200).json({
        status: result.status,
        message: result.message,
        question: result.question,
      });
    }

    return res.json({
      status: result.status,
      message: result.message,
    });
  },
};
