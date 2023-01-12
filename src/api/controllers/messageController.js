const messageService = require("../services/messageService");

module.exports = {
  getAll: async (req, res) => {
    let results = null;

    const { presentationId } = req.query;

    results = await messageService.getAll({ presentationId: presentationId });

    if (results.status == "success") {
      return res.status(200).json({
        status: results.status,
        messages: results.messages,
      });
    }
    return res.json({
      status: results.status,
      message: results.message,
    });
  },

  save: async (req, res) => {
    const { message, presentationId } = req.body.data;

    let result = null;
    result = await messageService.save({
      sender: req.user._id,
      presentationId: presentationId,
      message: message,
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
};
