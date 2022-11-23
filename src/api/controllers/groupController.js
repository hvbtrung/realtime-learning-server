const { request } = require("express");
const groupService = require("../services/groupService");

module.exports = {
  createGroup: async (req, res) => {
    const { data } = req.body;
    const result = await groupService.save(data);

    if (result) {
      return res.json({
        status: "success",
        message: "Creating a new group successfully",
      });
    }

    return res.json({
      status: "error",
      message: "Creating a new group failure",
    });
  },

  getGroupsByUserId: async (req, res) => {
    // const { data } = req.params;
    const { userid } = req.params;
    const data = await groupService.findGroupsByUserId({ userId: userid });

    if (data) {
      return res.json({
        status: "success",
        message: "get groups success",
        groups: data,
      });
    }

    return res.json({
      status: "error",
      message: "get groups failure",
    });
  },
};
