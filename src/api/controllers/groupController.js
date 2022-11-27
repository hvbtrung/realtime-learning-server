const groupService = require("../services/groupService");
const jwt = require("jsonwebtoken");

const signAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
  });
};

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
    const { userId } = req.params;
    const data = await groupService.findGroupsByUserId({ userId: userId });

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

  getGroupInfo: async (req, res) => {
    const { groupId, type } = req.params;

    const data = await groupService.findGroup({ groupId, type });
    if (data) {
      return res.json({
        status: "success",
        message: "get group info success",
        members: data,
      });
    }

    return res.json({
      status: "error",
      message: "get group info failure",
    });
  },

  sendLinkGroup: async (req, res) => {
    var { inviteeEmail, groupId, link } = req.body.data;

    const result = await groupService.sendMail({ inviteeEmail, groupId, link });

    if (result) {
      return res.json({
        status: "success",
        message: "Send email successful",
      });
    }

    return res.json({
      status: "error",
      message: "Email not sent, please try again",
    });
  },

  getGroup: async (req, res) => {
    const { groupId } = req.params;

    const data = await groupService.getGroup({ groupId });

    if (data) {
      return res.json({
        status: "success",
        message: "get group info success",
        group: data,
      });
    }

    return res.json({
      status: "error",
      message: "get group info failure",
    });
  },
};
