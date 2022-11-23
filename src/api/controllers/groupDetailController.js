const groupDetailService = require("../services/groupDetailService");

module.exports = {
  attach: async (req, res) => {
    const result = await groupDetailService.save(req.body);

    res.status(200).json({
      status: "success",
      data: result,
    });
  },
};
