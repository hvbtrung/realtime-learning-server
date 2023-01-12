const userPresentationService = require("../services/userPresentationService");

module.exports = {
  save: async (req, res) => {
    const { presentationId, email, role } = req.body.data;

    const result = await userPresentationService.save({
      email: email,
      presentationId: presentationId,
      role: role,
    });
    return res.json(result);
  },
};
