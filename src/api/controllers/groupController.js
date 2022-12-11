const groupService = require("../services/groupService");
const jwt = require("jsonwebtoken");

// don't remove this command code. I need it to fix join group in next time.
// const signAccessToken = (id) => {
//   return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
//   });
// };

module.exports = {
  createGroup: async (req, res) => {
    const { nameGroup, shortDesc } = req.body.data;

    const result = await groupService.save({
      nameGroup,
      shortDesc,
      userId: req.user._id,
    });

    if (result) {
      if (result.message === "invalid") {
        return res.json({
          status: "error",
          message: "Group's name or short description is too long!",
        });
      }

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
    const data = await groupService.findGroupsByUserId({
      userId: req.user._id,
    });

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
};
