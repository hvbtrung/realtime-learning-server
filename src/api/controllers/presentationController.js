const presentationService = require("../services/presentationService");

module.exports = {
  getAll: async (req, res) => {
    const results = await presentationService.getPresentationsByUserId({
      userId: req.user._id,
    });

    console.log("results", results);
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

  createPresentation: async (req, res) => {
    const { titlePresentation } = req.body.data;

    const result = await presentationService.save({
      userId: req.user._id,
      titlePresentation: titlePresentation,
    });
    return res.json(result);
  },

  updatePresentation: async (req, res) => {
    console.log("data", req.body.data);
    const { titlePresentation, presentationId } = req.body.data;

    const result = await presentationService.update({
      presentationId: presentationId,
      userId: req.user._id,
      titlePresentation: titlePresentation,
    });

    return res.json(result);
  },

  deletePresentation: async (req, res) => {
    const { presentationId } = req.params.id;

    const result = await presentationService.delete({
      userId: req.user._id,
      presentationId: presentationId,
    });
    return res.json(result);
  },
};
