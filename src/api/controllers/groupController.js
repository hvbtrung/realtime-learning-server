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

  assignRole: async (req, res) => {
    const { ownerId, groupId, role, email } = req.body.data;
    const result = await groupService.assignRole({
      ownerId,
      groupId,
      role,
      email,
    });

    if (result) {
      if (result.message === "exist") {
        return res.json({
          status: "error",
          message: "Member is exist",
        });
      } else if (result.message === "unauthorized") {
        return res.json({
          status: "error",
          message: "You don't have permission for this action",
        });
      } else if (result.message === "invalid") {
        return res.json({
          status: "error",
          message: "An email has been typed which is invalid",
        });
      }

      return res.json({
        status: "success",
        message: "Assign new role success",
      });
    }
  },
};
