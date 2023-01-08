const presentationService = require("../services/presentationService");
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
      messages: results.message,
    });
  },

  save: async (req, res) => {
    const { message, presentationId } = req.body.data;

    let results = null;
    results = await messageService.save({
      sender: req.user._id,
      presentationId: presentationId,
      message: message,
    });

    if (results.status == "success") {
      return res.status(200).json({
        status: results.status,
        presentations: results.presentations,
      });
    }

    return res.json({
      status: results.status,
      presentations: results.message,
    });
  },
};
