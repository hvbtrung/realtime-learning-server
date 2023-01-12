const presentationService = require("../services/presentationService");
const Presentation = require("../models/presentationModel");
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

  presentPresentation: async (req, res) => {
    const updatedPresentation = await Presentation.findByIdAndUpdate(req.params.id, req.body);

    if (!updatedPresentation) {
      const err = new Error("No slide found with that ID");
      err.statusCode = 404;
      throw err;
    }

    res.status(200).json({
      status: 'success',
      data: updatedPresentation
    });
  },

  getOne: async (req, res) => {
    const presentation = await Presentation.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: presentation
    });
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
