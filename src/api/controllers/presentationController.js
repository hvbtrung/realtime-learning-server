const presentationService = require("../services/presentationService");
const userPresentationService = require("../services/userPresentationService");

module.exports = {
  getAll: async (req, res) => {
    console.log(req.query.type);
    let results = null;

    switch (req.query.type) {
      case "ownedbyme": {
        results = await presentationService.getPresentationsByUserId({
          userId: req.user._id,
        });
        break;
      }
      case "sharedwithme": {
        results = await userPresentationService.getAll({
          userId: req.user._id,
        });
        break;
      }
    }

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
    const { titlePresentation, presentationId } = req.body.data;

    const result = await presentationService.update({
      presentationId: presentationId,
      userId: req.user._id,
      titlePresentation: titlePresentation,
    });

    return res.json(result);
  },

  deletePresentation: async (req, res) => {
    const { presentationId } = req.params;
    console.log("presentat", presentationId);
    const result = await presentationService.delete({
      userId: req.user._id,
      presentationId: presentationId,
    });
    return res.json(result);
  },
};
